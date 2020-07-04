import React, { useState } from "react";

function TodoForm(props) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (value !== "") {
      props.addTodo(value);
    }

    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write Something"
          aria-label="Write Something"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={value}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
