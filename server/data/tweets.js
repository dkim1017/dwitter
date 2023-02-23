import * as userRepository from './users.js'
import { getTweets } from '../db/database.js'
import MongoDb from 'mongodb'

const ObjectId = MongoDb.ObjectId

export async function getAllTweets() {
  return getTweets().find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweet)
}

export async function getAllTweetsFromUser(username) {
  return getTweets().find({ username })
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweet)
}

export async function getTweetById(id) {
  return getTweets().findOne({_id: new ObjectId(id)})
    .then(mapOptionalId)
}

export async function createTweet(text, username) {
  const user = await userRepository.findByUsername(username)
  let tweet = {
    text,
    createdAt: Date.now().toString(),
    name: user.name,
    username,
    url: user.url
  };
  return getTweets()
    .insertOne(tweet)
    .then((tweet) => mapOptionalId({...tweet, _id: tweet.insertedId}))
}

export async function updateTweet(id, text) {
  return getTweets().findOneAndUpdate({_id: new ObjectId(id)}, {$set: { text }}, {returnDocument: 'after'})
    .then((result) => {
      return result.value
    })
    .then(mapOptionalId)

  // const tweet = tweets.find(t => t.id === id);
  // if(tweet) {
  //   tweet.text = text
  // }
  // return getTweetById(tweet.id)
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) })
}

function mapOptionalId(tweet) {
  console.log("mapOptionalId: ", tweet)
  return tweet ? {...tweet, id: tweet._id.toString()} : tweet
}

function mapTweet(tweets) {
  return tweets.map(mapOptionalId)
}