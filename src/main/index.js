import { app, shell } from 'electron'
import createFileManager from './createFileManager'
import createCaptureWindow from './createCaptureWindow'
import trimDesktop from './trimDesktop'

/* eslint-disable no-unused-vars */
let captureWindow

function captureAndOpenItem() {
  const fileManager = createFileManager()
  return trimDesktop()
    .then(captureWindow.capture.bind(captureWindow))
    .then(image => {
      // 一時ファイル保存用ディレクトリに取得した画像を保存
      const createdFilename = fileManager.writeImage(app.getPath('temp'), image)
      return createdFilename
    })
    .then(shell.openItem.bind(shell))
    .then(() => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

}

app.on('ready', () => {
  captureWindow = createCaptureWindow()
  captureAndOpenItem()
})
