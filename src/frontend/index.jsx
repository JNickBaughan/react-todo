import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// helpers
import { mapTodos } from "../common/helpers";
// constants
import { routes } from "../common/constants";
// components
import { Todo } from "./components/todo";

const renderTodos = (todos, left) => {
  {
    return todos.map((todo) => {
      return (
        <React.Fragment>
          <Todo {...{ ...todo, marginLeft: `${left}px` }} />
          {todo.children &&
            todo.children.length > 0 &&
            renderTodos(todo.children, left + 50)}
        </React.Fragment>
      );
    });
  }
};

const App = () => {
  const [todos, updateTodos] = React.useState([]);
  React.useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get(routes.GET_TODOS);
      updateTodos(data);
    };
    getTodos();
  }, []);
  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <p>Todo apps are the new "hello world"</p>
      <br />
      <br />
      <br />
      {renderTodos(mapTodos(todos), 10)}
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
