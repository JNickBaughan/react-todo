import React from "react";

export const Todo = ({ todo, complete, left, id, checkTodo }) => {
  return (
    <label class="container" style={{ marginLeft: `${left}px` }}>
      <input
        type="checkbox"
        checked={complete ? "checked" : ""}
        onClick={() => {
          checkTodo(id, !complete);
        }}
      />
      <span class="checkmark"></span>
      {todo}
      <span class="plus alt"></span>
    </label>
  );
};

export default Todo;
