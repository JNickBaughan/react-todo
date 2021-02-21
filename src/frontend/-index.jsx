import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// helpers
import { mapTodos } from "../common/helpers";
// constants
import { routes } from "../common/constants";
// components
import { Todo } from "./components/todo";

const App = () => {
  // React.useEffect(() => {
  //   // const getTodos = async () => {
  //   //   //const { data } = await axios.get(routes.GET_TODOS);
  //   //   updateTodos([{ todo: "1", id: 1, complete: false }]);
  //   // };
  //   // getTodos();
  //   updateTodos([{ todo: "1546541", id: 1, complete: false }]);
  // }, []);

  const [widgets, updateTodos] = React.useState([
    { todo: "1", id: 1, complete: false },
    { todo: "1", id: 2, complete: false }
  ]);

  const checkTodo = (id) => {
    updateTodos(
      widgets.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const renderTodos = (todosToRender, left) => {
    {
      return todosToRender.map((todo) => {
        return (
          <React.Fragment>
            <Todo {...{ ...todo, marginLeft: `${left}px`, checkTodo }} />
            {todo.children &&
              todo.children.length > 0 &&
              renderTodos(todo.children, left + 50, checkTodo)}
          </React.Fragment>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <p>Todo apps are the new "hello world"</p>
      <br />
      <br />
      {renderTodos(mapTodos(widgets), 10)}
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
