import { OAuth } from 'oauth'
import config from './../config/config'

function createTwitterOAuth(){
  return new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    config.Twitter.consumerKey,
    config.Twitter.consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  )
}

export default createTwitterOAuth
