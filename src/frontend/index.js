import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Todos from "./components/todos";

import { routes } from "../common/constants";

import { findDescendentIds } from "../common/helpers";

const App = () => {
  const [todos, updateTodos] = React.useState([]);

  React.useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get(routes.GET_TODOS);
      updateTodos([...todos, ...data]);
    };
    getTodos();
  }, []);

  const checkTodo = (id, complete) => {
    if (complete) {
      const ancestor = [...findDescendentIds(id, todos), id];
      updateTodos(
        todos.map((todo) => {
          if (ancestor.includes(todo.id)) {
            return { ...todo, complete: true };
          }
          return todo;
        })
      );

      // complete all ancestor todos
    } else {
      updateTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        })
      );
    }
  };

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <p>Todo apps are the new "hello world"</p>
      <br />
      <br />
      <Todos todos={[...todos]} checkTodo={checkTodo} />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
