import React from "react";

export const Todo = ({ todo, complete, marginLeft }) => {
  return (
    <label class="container" style={{ marginLeft: `${marginLeft}` }}>
      <input type="checkbox" checked={complete ? "checked" : ""} />
      <span class="checkmark"></span>
      {todo}
    </label>
  );
};
