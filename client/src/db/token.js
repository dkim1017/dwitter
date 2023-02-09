const TOKEN = 'token';

export default class TokenStorage {
  setToken(token) {
    localStorage.setItem(TOKEN, token)
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN)
  }
}
