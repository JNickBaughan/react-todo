import { mapTodos } from "../../src/common/helpers";

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
      id: 1
    },
    {
      id: 2,
      parent: 1
    },
    {
      id: 3,
      parent: 2
    },
    {
      id: 4,
      parent: 2
    },
    {
      id: 5,
      parent: 1
    },
    {
      id: 6
    },
    {
      id: 7,
      parent: 6
    },
    {
      id: 8,
      parent: 6
    }
  ];
  const expected = [
    {
      id: 1,
      children: [
        {
          id: 2,
          parent: 1,
          children: [
            {
              id: 3,
              parent: 2,
              children: []
            },
            {
              id: 4,
              parent: 2,
              children: []
            }
          ]
        },
        {
          id: 5,
          parent: 1,
          children: []
        }
      ]
    },
    {
      id: 6,
      children: [
        {
          id: 7,
          parent: 6,
          children: []
        },
        {
          id: 8,
          parent: 6,
          children: []
        }
      ]
    }
  ];
  const actual = mapTodos(todos);
  expect(actual).toEqual(expected);
});
