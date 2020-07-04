import React from "react";
import Header from "./Header";
import Todo from "./TodoList";

function MainPage(props) {
  return (
    <div>
      <Header />
      <Todo />
    </div>
  );
}

export default MainPage;
