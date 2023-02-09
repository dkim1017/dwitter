import * as userRepository from './users.js'

let tweets =  [
    {
      id: '1',
      text: 'test tweet',
      createdAt: Date.now().toString(),
      username: 'bob'
    },
    {
      id: '2',
      text: 'Ellie tweet test',
      createdAt: Date.now().toString(),
      username: 'ellie'
    }
]

export async function getAllTweets() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { name, email, url } = await userRepository.findByUsername(tweet.username);
      tweet = { ...tweet, name, email, url }
      return tweet
  }))
}

export async function getAllTweetsFromUser(username) {
  return getAllTweets().then((tweets) =>
    tweets.filter((t) => t.username === username)
  );
}

export async function getTweetById(id) {
  const found = tweets.find(t => t.id === id)
  if(!found) {
    return null;
  }
  const { name, email, url } = await userRepository.findByUsername(found.username);
  return { ...found, name, email, url }
}

export async function createTweet(text, username) {
  let tweet = {
    id: Date.now().toString(),
    text,
    createdAt: Date.now().toString(),
    username
  };
  tweets = [tweet, ...tweets]
  return getTweetById(tweet.id)
}

export async function updateTweet(id, text) {
  const tweet = tweets.find(t => t.id === id);
  if(tweet) {
    tweet.text = text
  }
  return getTweetById(tweet.id)
}

export async function remove(id) {
  tweets = tweets.filter(t => t.id !== id);
}