import TwitterClient from './TwitterClient'

function createTwitterClient(oauth, oauthAccessToken, oauthAccessSecert) {
  return new TwitterClient(oauth, oauthAccessToken, oauthAccessSecert)
}

export default createTwitterClient
