const {
  map,
  filter,
  twoPileSort,
  getTodoName,
  getCompleteness,
  getPriority,
  isComplete,
  isHighPriority,
  names,
  namesAndPriorities,
  justNotComplete,
  justComplete,
  priority2Only,
  priority1Only,
  priority2First,
  notCompleteFirst,
} = require('./main.js')

const todos = require('./todos.js')

let originalTodos = [];

beforeEach(() => {
  originalTodos = [
    {
      text: 'Christmas shopping',
      complete: false,
      priority: 1,
    },
    {
      text: `make doctor's appointment`,
      complete: true,
      priority: 2,
    },
    {
      text: 'binge watch The Office',
      complete: false,
      priority: 2,
    },
    {
      text: 'research dinosaurs',
      complete: false,
      priority: 1,
    },
    {
      text: 'fire Colin',
      complete: true,
      priority: 2,
    },
    {
      text: 'start novel',
      complete: true,
      priority: 1,
    },
  ]
})


describe('map', () => {
  it(`modifies each element of the given array by running it through the given function`, () => {
    const greetings = ['hi', 'hello', 'how are you'];

    const yell = function(greeting) {
      return greeting + '!'
    }

    const fish = ['whale', 'dogfish', 'nurse'];
    const sharks = ['whale shark', 'dogfish shark', 'nurse shark'];

    const makeShark = function(fish) {
      return `${fish} shark`;
    }

    expect(map(greetings, yell)).toEqual(['hi!', 'hello!', 'how are you!'])
    expect(map(fish, makeShark)).toEqual(sharks)
  })

  it(`doesn't modify the original array`, () => {
    const makeHighPriority = function(todo) {
      return {...todo, priority: 2}
    }

    map(todos, makeHighPriority);
    expect(todos).toEqual(originalTodos);
  })
})


describe('filter', () => {
  it(`returns a new array with only the elements of the given array that, when passed through the given function, return true`, () => {
    const greetings = ['hi', 'hello', 'how are you'];
    const fish = ['whale', 'dogfish', 'nurse'];

    const isShort = function(greeting) {
      return greeting.length < 6;
    }
    
    const hasFishInName= function(fish) {
      return fish.includes('fish')
    }

    expect(filter(greetings, isShort)).toEqual(['hi', 'hello'])
    expect(filter(fish, hasFishInName)).toEqual(['dogfish'])
  })

  it(`doesn't modify the original array`, () => {
    const nameIsShort = function(todo) {
      return todo.text.length < 10
    }

    filter(todos, nameIsShort);
    expect(todos).toEqual(originalTodos);
  })
})

describe('twoPileSort', () => {
  it(`returns a new array where elements from the given function that pass the given testing function are put at the beginning, while those who don't are put at the end`, () => {
    const greetings = ['hi', 'how are you', 'hello', 'you are looking well today'];
    const fish = ['whale', 'dogfish', 'starfish', 'manta ray', 'here fishy fishy fishy'];

    const isShort = function(greeting) {
      return greeting.length < 6;
    }
    
    const hasFishInName = function(fish) {
      return fish.includes('fish')
    }

    const shortGreetingsFirst = twoPileSort(greetings, isShort);
    const firstLongGreetingIndex = shortGreetingsFirst.findIndex((greeting) => greeting.length >= 6)

    const foundShortGreetingAfter = shortGreetingsFirst.slice(firstLongGreetingIndex)
      .some((greeting) => greeting.length < 6)

    expect(firstLongGreetingIndex).toBe(2);
    expect(foundShortGreetingAfter).toBe(false);

    const fishyFishFirst = twoPileSort(fish, hasFishInName);
    const firstUnfishyFishIndex = fishyFishFirst.findIndex((fish) => !fish.includes('fish'))

    const foundFishyFishAfter = fishyFishFirst.slice(firstUnfishyFishIndex)
      .some((fish) => fish.includes('fish'))

    expect(firstUnfishyFishIndex).toBe(3);
    expect(foundFishyFishAfter).toBe(false);
  })

  it(`doesn't modify the original array`, () => {
    const nameIsShort = function(todo) {
      return todo.text.length < 10
    }

    twoPileSort(todos, nameIsShort);
    expect(todos).toEqual(originalTodos);
  })
})



describe('getTodoName', () => {
  it(`returns the text property of a todo`, () => {
    const todo1 = {
    text: 'Christmas shopping',
    
    complete: false,
    priority: 1,
  };

  const todo2 = {
    text: `make doctor's appointment`,
    
    complete: false,
    priority: 2,
  };

    expect(getTodoName(todo1)).toBe('Christmas shopping')
    expect(getTodoName(todo2)).toBe(`make doctor's appointment`)
  })
})

describe('getCompleteness', () => {
  it(`returns the completeness of a todo`, () => {
    const todo1 = {
    text: 'Christmas shopping',
    
    complete: false,
    priority: 1,
  };

  const todo2 = {
    text: `make doctor's appointment`,
    
    complete: true,
    priority: 2,
  };

    expect(getCompleteness(todo1)).toBe(false)
    expect(getCompleteness(todo2)).toBe(true)
  })
})

describe('getPriority', () => {
  it(`returns the priority of a todo`, () => {
    const todo1 = {
    text: 'Christmas shopping',
    
    complete: false,
    priority: 1,
  };

  const todo2 = {
    text: `make doctor's appointment`,
    
    complete: true,
    priority: 2,
  };

    expect(getPriority(todo1)).toBe(1)
    expect(getPriority(todo2)).toBe(2)
  })
})

describe('isComplete', () => {
  it(`returns whether the given todo is complete`, () => {
    const todo1 = {
    text: 'Christmas shopping',
    
    complete: false,
    priority: 1,
  };

  const todo2 = {
    text: `make doctor's appointment`,
    
    complete: true,
    priority: 2,
  };

    expect(isComplete(todo1)).toBe(false)
    expect(isComplete(todo2)).toBe(true)
  })
})

describe('isHighPriority', () => {
  it(`returns whether the given todo is of high priority`, () => {
    const todo1 = {
    text: 'Christmas shopping',
    
    complete: false,
    priority: 2,
  };

  const todo2 = {
    text: `make doctor's appointment`,
    
    complete: true,
    priority: 1,
  };

    expect(isHighPriority(todo1)).toBe(true)
    expect(isHighPriority(todo2)).toBe(false)
  })
})

describe('names', () => {
  it(`returns an array of the given todos names`, () => {
    expect(names(todos)).toEqual([
      'Christmas shopping',
      `make doctor's appointment`,
      'binge watch The Office',
      'research dinosaurs',
      'fire Colin',
      'start novel',
    ])
  })

  it(`doesn't modify the original array`, () => {
    names(todos);
    expect(todos).toEqual(originalTodos);
  });
});

describe('namesAndPriorities', () => {
  it(`returns an array of the string containing the given todos name and priority`, () => {
    expect(namesAndPriorities(todos)).toEqual([
      'Christmas shopping - Low',
      `make doctor's appointment - High`,
      'binge watch The Office - High',
      'research dinosaurs - Low',
      'fire Colin - High',
      'start novel - Low',
    ])
  })

  it(`doesn't modify the original array`, () => {
    namesAndPriorities(todos);
    expect(todos).toEqual(originalTodos);
  });
});

describe('justNotComplete', () => {
  it(`returns an array of only those todos that are not complete`, () => {
    const notComplete = [
      {
        text: 'Christmas shopping',
        
        complete: false,
        priority: 1,
      },
      {
        text: 'binge watch The Office',
        
        complete: false,
        priority: 2,
      },
      {
        text: 'research dinosaurs',
        
        complete: false,
        priority: 1,
      },
    ];

    expect(justNotComplete(todos)).toEqual(notComplete);
  })

  it(`doesn't modify the original array`, () => {
    justNotComplete(todos);
    expect(todos).toEqual(originalTodos);
  });
})

describe('justComplete', () => {
  it(`returns an array of only those todos that are not complete`, () => {
    const complete = [
      {
        text: `make doctor's appointment`,
        
        complete: true,
        priority: 2,
      },
      {
        text: 'fire Colin',
        
        complete: true,
        priority: 2,
      },
      {
        text: 'start novel',
        
        complete: true,
        priority: 1,
      },
    ];

    expect(justComplete(todos)).toEqual(complete);
  })

  it(`doesn't modify the original array`, () => {
    justComplete(todos);
    expect(todos).toEqual(originalTodos);
  });
})

describe('priority2Only', () => {
  it(`returns an array of only those todos that are of high priority`, () => {
    const highPriority = [
      {
        text: `make doctor's appointment`,
        
        complete: true,
        priority: 2,
      },
      {
        text: 'binge watch The Office',
        
        complete: false,
        priority: 2,
      },
      {
        text: 'fire Colin',
        
        complete: true,
        priority: 2,
      },
    ]

    expect(priority2Only(todos)).toEqual(highPriority);
  })

  it(`doesn't modify the original array`, () => {
    priority2Only(todos);
    expect(todos).toEqual(originalTodos);
  });
})

describe('priority1Only', () => {
  it(`returns an array of only those todos that are of low priority`, () => {
    const lowPriority = [
      {
        text: 'Christmas shopping',
        
        complete: false,
        priority: 1,
      },
      {
        text: 'research dinosaurs',
        
        complete: false,
        priority: 1,
      },
      {
        text: 'start novel',
        
        complete: true,
        priority: 1,
      },
    ]

    expect(priority1Only(todos)).toEqual(lowPriority);
  })

  it(`doesn't modify the original array`, () => {
    priority1Only(todos);
    expect(todos).toEqual(originalTodos);
  });
})

describe('notCompleteFirst', () => {
  it(`returns a new array that is sorted with the not complete items first`, () => {
    const sorted = notCompleteFirst(todos);
    const firstCompleteIndex = sorted.findIndex((todo) => todo.complete)

    const foundNotCompleteAfter = sorted.slice(firstCompleteIndex)
      .some((todo) => !todo.complete)

    expect(firstCompleteIndex).toBe(3);
    expect(foundNotCompleteAfter).toBe(false);
  })

  it(`doesn't modify the original array`, () => {
    notCompleteFirst(todos);
    expect(todos).toEqual(originalTodos);
  });
})

describe('priority2First', () => {
  it(`returns a new array that is sorted with the higher priority items first`, () => {
    const sorted = priority2First(todos);
    const firstLowPriorityIndex = sorted.findIndex((todo) => todo.priority === 1)

    const foundHighPriorityAfter = sorted.slice(firstLowPriorityIndex)
      .some((todo) => todo.priority === 2)

    expect(firstLowPriorityIndex).toBe(3);
    expect(foundHighPriorityAfter).toBe(false);
  })

  it(`doesn't modify the original array`, () => {
    priority2First(todos);
    expect(todos).toEqual(originalTodos);
  });
})