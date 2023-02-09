import * as tweetRepository from '../data/tweets.js'

const AUTH_ERROR = { message: 'Authentication Error'};

export async function isAuthen(req, res, next) {
  const tweet = await tweetRepository.getTweetById(req.params.id)
  const authenUser = req.username

  console.log("1111: ", tweet.username)
  console.log("2222: ", authenUser)

  if(tweet.username === authenUser) {
    next()
  } else {
    return res.status(401).json(AUTH_ERROR)
  }
}