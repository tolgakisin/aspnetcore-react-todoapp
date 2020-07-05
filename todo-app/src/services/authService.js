import Auth from "../stores/Auth";
import Helper from "../stores/Helper";

export default class AuthService {
  static isSignedIn() {
    return !!Auth.getToken();
  }

  static signOut() {
    Auth.removeToken();
  }

  static async signIn(username, password) {
    try {
      const response = await fetch(
        Helper.API_URL + Helper.LOGIN_URL,
        Helper.RequestOptions("POST", JSON.stringify({ username, password }))
      ).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          Auth.removeToken();
          console.log("Username or password is wrong.");
        }
      });

      return response;
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }

  static async register(username, password) {
    try {
      return await fetch(
        Helper.API_URL + Helper.REGISTER_URL,
        Helper.RequestOptions(
          "POST",
          JSON.stringify({
            Username: username,
            Password: password,
          })
        )
      );
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }
}
