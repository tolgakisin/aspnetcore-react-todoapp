export default class Auth {
  static STORAGE_KEY = "token";

  static getToken() {
    return localStorage.getItem(Auth.STORAGE_KEY);
  }

  static setToken(token) {
    return localStorage.setItem(Auth.STORAGE_KEY, token);
  }

  static removeToken() {
    return localStorage.removeItem(Auth.STORAGE_KEY);
  }
}
