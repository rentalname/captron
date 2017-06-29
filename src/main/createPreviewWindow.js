import { BrowserWindow, ipcMain } from 'electron'
import { EventEmitter } from 'events'
import createFileManager from './createFileManager'
import createTwitterLoginManager from './createTwitterLoginManager'

class PreviewWindow extends EventEmitter {
  constructor({ filename }) {
    super()
    this.win = new BrowserWindow({
      width: 500,
      height: 430
    })
    this.fileManager = createFileManager()
    this.filename = filename
    this.win.loadURL(`file://${__dirname}/../../previewWindow.html?filename=${filename}`)
    const handler = this.handlePopstTweet.bind(this)
    ipcMain.on('POST_TWEET', handler)
    this.win.on('close', () => {
      ipcMain.removeAllListeners('POST_TWEET', handler)
    })
  }

  handlePopstTweet(e, args) {
    this.postTweet(args).then(url => {
      e.sender.send('REPLY_POST_TWEET', { url })
      this.emit('DONE_TWEET', { url })
    }).catch(error => {
      e.sender.send('REPLY_POST_TWEET', { error })
    })
  }

  postTweet({ message }) {
    const loginManager = createTwitterLoginManager()
    return loginManager.init().then(() => {
      const client = loginManager.createClient()
      return this.fileManager.readAsBase64String(this.filename)
        .then(data => {
          return client.uploadMedia({ media: data })
        })
        .then(media => {
          return client.updateStatuses({
            status: message,
            media_ids: media.media_id_string
          })
        })
        .then(status => {
          return `https://twitter.com/${status.user.name}/statuses/${status.id_str}`
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  close() {
    this.win.close()
  }
}

function createPreviewWindow({ filename }) {
  return new PreviewWindow({ filename })
}

export default createPreviewWindow
