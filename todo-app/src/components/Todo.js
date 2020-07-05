import React from "react";

function Todo(props) {
  var todos = props.content.map((item, index) => {
    return (
      <ul className="list-group" key={index}>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {item.Content}
          <div className="">
            <button
              className="badge badge-primary badge-pill btn btn-success mr-3"
              onClick={() => props.handleConfirm(item.Id)}
            >
              {item.IsDone !== true ? "Done" : "Undone"}
            </button>

            <button
              className="badge badge-primary badge-pill btn btn-danger"
              onClick={() => props.handleDelete(item.Id, item.IsDone)}
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    );
  });

  return <div>{todos}</div>;
}

export default Todo;
