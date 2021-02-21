import React from "react";

export const Todo = ({ todo, complete, marginLeft, id, checkTodo }) => {
  return (
    <label class="container" style={{ marginLeft: `${marginLeft}` }}>
      <input
        type="checkbox"
        checked={complete ? "checked" : ""}
        onClick={() => {
          checkTodo(id);
        }}
      />
      <span class="checkmark"></span>
      {todo}
      <span class="plus alt"></span>
    </label>
  );
};

export default Todo;
