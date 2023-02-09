export default class TweetService {

  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    const data = this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return data
  }

  async postTweet(text) {
    return await this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' })
    })
  }

  async deleteTweet(tweetId) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text })
    })
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`
    }
  }
}
