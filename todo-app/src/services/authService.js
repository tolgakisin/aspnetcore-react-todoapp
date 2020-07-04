import Auth from "../stores/Auth";

export default class AuthService {
  static isSignedIn() {
    return !!Auth.getToken();
  }

  static signOut() {
    Auth.removeToken();
  }
}
