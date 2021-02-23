import React from "react";
import Todo from "./todo";

import { mapTodos } from "../../common/helpers/todo-helpers";

export const Todos = ({ todos, checkTodo }) => {
  const renderTodos = (todos, left) => {
    {
      return todos.map((todo) => {
        return (
          <React.Fragment>
            <Todo key={`${todo.id}_todo`} {...{ ...todo, left, checkTodo }} />
            {todo.children &&
              todo.children.length > 0 &&
              renderTodos(todo.children, left + 50)}
          </React.Fragment>
        );
      });
    }
  };

  return renderTodos(mapTodos(todos), 10);
};

export default Todos;
