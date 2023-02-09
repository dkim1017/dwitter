import * as tweetRepository from '../data/tweets.js'

export async function getAllTweetsController (req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllTweetsFromUser(username)
    : tweetRepository.getAllTweets());
  res.status(200).json(data);
}

export async function getTweetsById (req, res) {
  const id = req.params.id;
  //find vs filter
  //find returns single element
  //filter returns array with all elements that matches condition
  const data = await tweetRepository.getTweetById(id);
  if(data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found`})
  }
}

export async function postTweet (req, res) {
  const { text } = req.body
  console.log("111111: ", req.username)
  const tweet = await tweetRepository.createTweet(text, req.username)
  res.status(201).json(tweet)
}

export async function editTweet (req, res) {
  const id = req.params.id
  const text = req.body.text
  const tweet = await tweetRepository.updateTweet(id, text)
  if(tweet) {
    res.status(200).json(tweet)
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found`})
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id
  await tweetRepository.remove(id)
  res.sendStatus(204)
}