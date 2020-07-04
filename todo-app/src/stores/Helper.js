import Auth from "./Auth";

export default class Helper {
  static API_URL = "https://localhost:5001";
  static LOGIN_URL = "/api/users/authenticate";
  static REGISTER_URL = "/api/users/register";
  static TODO_URL = "/api/todo/";
  static TODO_CONFIRM = "/api/todo/confirmtodo/";
  static TODO_BY_DONE = "/api/todo/todosByDone";
  static TODO_BY_NOTDONE = "/api/todo/todosByNotDone";

  static RequestOptions = (method, requestBody) => {
    return {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken(),
      },
      body: requestBody,
    };
  };
}
