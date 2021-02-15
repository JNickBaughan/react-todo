import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <p>Todo apps are the new "hello world"</p>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
