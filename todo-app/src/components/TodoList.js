import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import TodoService from "../services/todoService";

function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleAddTodo(content) {
    TodoService.AddTodo(content).then((data) =>
      setTodos((prevState) => [...prevState, data])
    );
  }

  function handleDelete(id) {
    if (id < 0 || id == null) {
      alert("An error occured.");
    } else {
      TodoService.DeleteTodo(id).then((response) => {
        if (response.status === 200) {
          var todoList = [];

          todoList = [...todos];
          todoList.map((item, index) => {
            if (item.Id === id) {
              todoList.splice(index, 1);
            }
            return item;
          });

          setTodos(todoList);
          console.log("Todo is deleted.");
        }
      });
    }
  }

  function handleConfirm(id) {
    if (id < 0 || id == null) {
      alert("An error occured.");
    } else {
      TodoService.ConfirmTodo(id).then((response) => {
        if (response.status === 200) {
          var todoList = [...todos];
          todoList.map((item, index) => {
            if (item.Id === id) {
              item.IsDone = !item.IsDone;
            }
            return item;
          });

          setTodos(todoList);
        }
      });
    }
  }

  useEffect(() => {
    TodoService.GetTodos().then((result) => setTodos(result));
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>TO DO LIST</h3>
          <div>
            <Todo
              content={todos.filter((item) => item.IsDone === false)}
              handleDelete={handleDelete}
              handleConfirm={handleConfirm}
            />
            <TodoForm addTodo={handleAddTodo} />
          </div>

          <br />

          <h3>DONE LIST</h3>
          <div>
            <Todo
              content={todos.filter((item) => item.IsDone === true)}
              handleDelete={handleDelete}
              handleConfirm={handleConfirm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
