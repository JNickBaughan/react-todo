const findParent = (todo, sortedTodos) => {
  let found = false;
  sortedTodos.forEach((sortedTodo) => {
    if (!found) {
      if (sortedTodo.id === todo.parent) {
        sortedTodo.children.push({ ...todo, children: [] });
        found = true;
      } else {
        found = findParent(todo, sortedTodo.children);
      }
    }
  });

  return found;
};

export const mapTodos = (todos) => {
  const sortedTodos = [];
  do {
    const copy = [...todos];
    copy.forEach((todo) => {
      if (!todo.parent) {
        sortedTodos.push({ ...todo, children: [] });
        const inx = todos.findIndex((t) => t.id === todo.id);
        if (inx > -1) {
          todos.splice(inx, 1);
        }
      } else {
        const foundParent = findParent(todo, sortedTodos);
        if (foundParent) {
          const inx = todos.findIndex((t) => t.id === todo.id);
          if (inx > -1) {
            todos.splice(inx, 1);
          }
        }
      }
    });
  } while (todos.length);
  return sortedTodos;
};

export const findDescendentIds = (id, todos) => {
  let ids = [];
  todos.forEach((todo) => {
    if (todo.parent === id) {
      const childIds = findDescendentIds(todo.id, todos);
      ids = [...ids, ...childIds, todo.id];
    }
  });
  return ids;
};
