//DEPRECATED
export default class TweetService {

  constructor() {
    this.baseURL =  'http://localhost:8080'
  }
  async getTweets(username) {
    console.log(`TESTEST ${this.baseURL}`)
    const query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      header: { 'Content-type': 'application/json' }
    });
    const data = await response.json();
    if (response.status !== 200){
      throw new Error(data.message)
    }
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      header: { 'Content-type': 'application/json' },
      body: JSON.stringify({ text, username: `dkim`, name: `Michae` })
    })
    const data = await response.json();
    if (response.status !== 201){
      throw new Error(data.message)
    }
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      header: { 'Content-type': 'application/json' }
    })
    const data = await response.json();
    if (response.status !== 204){
      throw new Error(data.message)
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      header: { 'Content-type': 'application/json' },
      body: { text }
    })
    const data = await response.json();
    if (response.status !== 200){
      throw new Error(data.message)
    }
  }
}
