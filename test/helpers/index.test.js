import { mapTodos } from "../../src/helpers";

test("sorts todos", () => {
  const todos = [{ id: 1 }, { id: 2, parent: 1 }, { id: 3, parent: 1 }];
  const expected = [
    {
      id: 1,
      children: [
        { id: 2, parent: 1, children: [] },
        { id: 3, parent: 1, children: [] }
      ]
    }
  ];
  const actual = mapTodos(todos);
  expect(actual).toEqual(expected);
});

test("sorts todos", () => {
  const todos = [
    {
      id: 1,
      todo: "Clean attic",
      complete: false
    },
    {
      id: 2,
      todo: "add shelves in attic",
      complete: false,
      parent: 1
    },
    {
      id: 3,
      todo: "add shelves beside attic vent",
      complete: false,
      parent: 2
    },
    {
      id: 4,
      todo: "add shelves by attic door",
      complete: false,
      parent: 2
    },
    {
      id: 5,
      todo: "move old clothes",
      complete: false,
      parent: 1
    },
    {
      id: 6,
      todo: "finish Kitchen renovations",
      complete: false
    },
    {
      id: 7,
      todo: "tile backsplash",
      complete: false,
      parent: 6
    },
    {
      id: 8,
      todo: "paint wall",
      complete: false,
      parent: 6
    }
  ];
  const expected = [
    {
      id: 1,
      todo: "Clean attic",
      complete: false,
      children: [
        {
          id: 2,
          todo: "add shelves in attic",
          complete: false,
          parent: 1,
          children: [
            {
              id: 3,
              todo: "add shelves beside attic vent",
              complete: false,
              parent: 2,
              children: []
            },
            {
              id: 4,
              todo: "add shelves by attic door",
              complete: false,
              parent: 2,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 6,
      todo: "finish Kitchen renovations",
      complete: false,
      children: [
        {
          id: 7,
          todo: "tile backsplash",
          complete: false,
          parent: 6,
          children: []
        },
        {
          id: 8,
          todo: "paint wall",
          complete: false,
          parent: 6,
          children: []
        }
      ]
    }
  ];
  const actual = mapTodos(todos);
  expect(actual).toEqual(expected);
});
