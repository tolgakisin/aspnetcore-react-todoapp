import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Helper from "../stores/Helper";

function TodoList(props) {
  // const [todos, setTodos] = useState([]);
  const [todosByNotDone, setTodosByNotDone] = useState([]);
  const [todosByDone, setTodosByDone] = useState([]);
  const [isLoadingByDoneList, setIsLoadingDoneList] = useState(true);
  const [isLoadingByNotDoneList, setIsLoadingNotDoneList] = useState(true);

  function handleAddTodo(content) {
    fetch(
      Helper.API_URL + Helper.TODO_URL,
      Helper.RequestOptions("POST", JSON.stringify({ Content: content }))
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Todo is created.");
          return response.json();
        }
      })
      .then((data) => {
        setTodosByNotDone((prevState) => [...prevState, data]);
      })
      .catch((error) => alert("An error occured."));
  }

  function handleDelete(id, isDone) {
    if (id < 0 || id == null) {
      alert("An error occured.");
    } else {
      fetch(
        Helper.API_URL + Helper.TODO_URL + id,
        Helper.RequestOptions("DELETE")
      )
        .then((response) => {
          if (response.status === 200) {
            var todoList = [];
            if (isDone === true) {
              todoList = [...todosByDone];
              todoList.map((item, index) => {
                if (item.Id === id) {
                  todoList.splice(index, 1);
                }
                return item;
              });

              setTodosByDone(todoList);
            } else {
              todoList = [...todosByNotDone];
              todoList.map((item, index) => {
                if (item.Id === id) {
                  todoList.splice(index, 1);
                }
                return item;
              });

              setTodosByNotDone(todoList);
            }

            alert("Todo is deleted.");
          }
        })
        .catch((error) => alert("An error occured."));
    }
  }

  function handleConfirm(id) {
    if (id < 0 || id == null) {
      alert("An error occured.");
    } else {
      fetch(
        Helper.API_URL + Helper.TODO_CONFIRM + id,
        Helper.RequestOptions("POST")
      )
        .then((response) => {
          if (response.status === 200) {
            var todoListByNotDone = [...todosByNotDone];
            var todoListByDone = [...todosByDone];
            todoListByNotDone.map((item, index) => {
              if (item.Id === id) {
                item.IsDone = true;
                todoListByDone.push(item);
                todoListByNotDone.splice(index, 1);
              }
              return item;
            });

            setTodosByNotDone(todoListByNotDone);
            setTodosByDone(todoListByDone);
            alert("Todo is done.");
          }
        })
        .catch((error) => alert("An error occured."));
    }
  }

  useEffect(() => {
    fetch(Helper.API_URL + Helper.TODO_BY_DONE, Helper.RequestOptions("GET"))
      .then((response) => response.json())
      .then((data) => {
        setTodosByDone(data);
        setIsLoadingDoneList(false);
      })
      .catch((error) => console.log("An error occured."));
  }, []);

  useEffect(() => {
    fetch(Helper.API_URL + Helper.TODO_BY_NOTDONE, Helper.RequestOptions("GET"))
      .then((response) => response.json())
      .then((data) => {
        setTodosByNotDone(data);
        setIsLoadingNotDoneList(false);
      })
      .catch((error) => console.log("An error occured."));
  }, []);

  return (
    <div>
      <h3>TO DO LIST</h3>

      {isLoadingByNotDoneList === true ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Todo
            content={todosByNotDone}
            handleDelete={handleDelete}
            handleConfirm={handleConfirm}
          />
          <TodoForm addTodo={handleAddTodo} />
        </div>
      )}

      <h3>DONE LIST</h3>

      {isLoadingByDoneList === true ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Todo
            content={todosByDone}
            handleDelete={handleDelete}
            isDone={true}
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;
