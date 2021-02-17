import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const renderTodos = (todos, left) => {
  {
    return todos.map((todo) => {
      return (
        <React.Fragment>
          <p style={{ marginLeft: `${left}px` }}>{todo.todo}</p>
          {renderTodos(todo.children, left + 10)}
        </React.Fragment>
      );
    });
  }
};

const App = () => {
  const [todos, updateTodos] = React.useState([]);
  React.useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get("/todos");
      updateTodos(data);
    };
    getTodos();
  }, []);
  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <p>Todo apps are the new "hello world"</p>
      {renderTodos(todos, 10)}
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
