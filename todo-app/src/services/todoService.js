import Helper from "../stores/Helper";

export default class TodoService {
  static async GetTodos() {
    try {
      const response = await fetch(
        Helper.API_URL + Helper.TODO_URL,
        Helper.RequestOptions("GET")
      );

      return await response.json();
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }

  static async AddTodo(content) {
    try {
      const response = await fetch(
        Helper.API_URL + Helper.TODO_URL,
        Helper.RequestOptions("POST", JSON.stringify({ Content: content }))
      );

      if (response.status === 200) {
        console.log("Todo is created.");
        return await response.json();
      }
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }

  static async DeleteTodo(id) {
    try {
      return await fetch(
        Helper.API_URL + Helper.TODO_URL + id,
        Helper.RequestOptions("DELETE")
      );
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }

  static async ConfirmTodo(id) {
    try {
      return await fetch(
        Helper.API_URL + Helper.TODO_CONFIRM + id,
        Helper.RequestOptions("POST")
      );
    } catch (error) {
      return console.log("An error occured.", error);
    }
  }
}
