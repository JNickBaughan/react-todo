import {
  mapTodos,
  findDescendentIds,
  findSiblings,
  siblingsAllComplete,
  findIdsToComplete
} from "../../src/common/helpers/todo-helpers";

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

test("get IDs of descendent todos", () => {
  const expected = [3, 4, 2, 5];
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

  const actual = findDescendentIds(1, todos);
  expect(actual).toEqual(expected);
});

test("findIdsToComplete", () => {
  const expected = [3, 1, 2, 4, 5];
  const todos = [
    {
      id: 1,
      complete: false
    },
    {
      id: 2,
      parent: 1,
      complete: true
    },
    {
      id: 3,
      parent: 1,
      complete: false
    },
    {
      id: 4,
      parent: 3,
      complete: true
    },
    {
      id: 5,
      parent: 3,
      complete: false
    },
    {
      id: 5,
      complete: false
    }
  ];

  const actual = findIdsToComplete(5, 3, todos);
  expect(actual).toEqual(expected);
});

test("gets a todos Sibling ", () => {
  const expected = [
    {
      id: 4,
      parent: 3,
      complete: true
    },
    {
      id: 5,
      parent: 3,
      complete: false
    }
  ];
  const todos = [
    {
      id: 1,
      complete: false
    },
    {
      id: 2,
      parent: 1,
      complete: true
    },
    {
      id: 3,
      parent: 1,
      complete: false
    },
    {
      id: 4,
      parent: 3,
      complete: true
    },
    {
      id: 5,
      parent: 3,
      complete: false
    }
  ];

  const actual = findSiblings(todos, 3);
  expect(actual).toEqual(expected);
});

test("are all siblings completed", () => {
  const expected = true;
  const todos = [
    {
      id: 2,
      parent: 1,
      complete: false
    },
    {
      id: 3,
      parent: 1,
      complete: true
    },
    {
      id: 4,
      parent: 1,
      complete: true
    },
    {
      id: 5,
      parent: 1,
      complete: true
    }
  ];

  const actual = siblingsAllComplete(todos, 1, 2);
  expect(actual).toEqual(expected);
});
