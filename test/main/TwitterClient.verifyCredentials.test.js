import createTwitterOAuth from '../../src/main/createTwitterOAuth'
import createTwitterClient from '../../src/main/createTwitterClient'
import config from '../../src/config/config'

const client = createTwitterClient(
  createTwitterOAuth(),
  config.Twitter.accessToken,
  config.Twitter.accessTokenSecret
)

client.verifyCredentials().then(data=>{
  console.log(data)
}).catch(error => {
  console.log(error)
})
