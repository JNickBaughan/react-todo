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

export const siblingsAllComplete = (todos, parentId, id) => {
  return todos.every(
    (todo) => (todo.complete && todo.parent === parentId) || todo.id === id
  );
};

const removeDupes = (acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }
  return acc;
};

export const findSiblings = (todos, parentId) =>
  todos.filter((todo) => todo.parent === parentId);

export const findIdsToUncomplete = (id = -1, parentId = -1, todos = []) => {
  const parentsParent = todos.find((todo) => todo.id === parentId);
  if (parentsParent && parentsParent.parent) {
    return [
      ...findIdsToUncomplete(parentId, parentsParent.parent, todos),
      id,
      parentId,
      parentsParent
    ];
  }
  return [id, parentId, parentsParent];
};

export const findIdsToComplete = (id = -1, parentId = -1, todos = []) => {
  const siblings = findSiblings(todos, parentId);
  const allComplete = siblingsAllComplete(siblings, parentId, id);

  if (allComplete) {
    const parent = todos.find((todo) => todo.id === parentId);
    if (parent && parent.parent) {
      return [
        parent.id,
        ...findIdsToComplete(parentId, parent.parent, todos),
        ...siblings.map((sibling) => sibling.id)
      ].reduce(removeDupes, []);
    } else {
      return [
        ...((parent && [parent.id]) || []),
        ...siblings.map((sibling) => sibling.id)
      ].reduce(removeDupes, []);
    }
  }

  return [];
};
