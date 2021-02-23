import React from "react";

export const Todo = ({ todo, complete, left, id, parent, checkTodo }) => {
  return (
    <label className="container" style={{ marginLeft: `${left}px` }}>
      <input
        type="checkbox"
        checked={complete ? "checked" : ""}
        onClick={() => {
          checkTodo(id, parent, !complete);
        }}
      />
      <span className="checkmark"></span>
      {todo}
      <span className="plus alt"></span>
    </label>
  );
};

export default Todo;
