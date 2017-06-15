import { app } from 'electron'
import trimDesktop from './trimDesktop'

app.on('ready', ()=>{
  trimDesktop().then(({sourceDisplay, trimmedBounds})=>{
    console.log(sourceDisplay, trimmedBounds)
  })
})
