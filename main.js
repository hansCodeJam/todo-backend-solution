/********************
 * OPTIONAL HELPERS *
 ********************/

/*

These functions will greatly simplify things if you want to write them. They are
implementations of map and filter, plus a very simple sort. If you can do them first, they will make the following functions a lot easier, but they aren't super easy
concepts, so if you want to skip them, you can.

They'll also become easier later once you've written a few of the iteration functions and seen how they can be generalized. Those iteration functions in the last section are good practice for writing these!

*/

const map = function(arr, func) {
  const result = [];
  arr.forEach(function(element) {
    result.push(func(element))
  })

  // Or:
  // for (const element of arr) {
  //   result.push(func(element))
  // }

  return result;
}

const filter = function(arr, test) {
  const filtered = [];

  arr.forEach(function(element) {
    if(test(element)) {
      filtered.push(element)
    }
  })

  return filtered;
}

const twoPileSort = function(arr, test) {
  // unshift/push method:
  const sorted = [];

  arr.forEach(function(element) {
    if(test(element)) {
      sorted.unshift(element)
    } else {
      sorted.push(element);
    }
  })

  return sorted;

  // two-array method:
  // const pile1 = filter(arr, test);
  // const pile2 = filter(arr, function(element) {
  //   return !test(element)
  // })

  // pile2.forEach(function(element) {
  //   pile1.push(element);
  // })

  // return pile1;

  // two array method using concat:
  // const pile1 = filter(arr, test);
  // const pile2 = filter(arr, function(element) {
  //   return !test(element)
  // })

  // return pile1.concat(pile2);
}



/********************
 * HELPER FUNCTIONS *
 ********************/

const getTodoName = function(todo) {
  return todo.text
}

const getCompleteness = function (todo) {
  return todo.complete
}

const getPriority = function (todo) {
  return todo.priority
}

const isComplete = function(todo) {
  return todo.complete
}

const isNotComplete = function(todo) {
  return !isComplete(todo)
}

const isHighPriority = function(todo) {
  return todo.priority === 2
}

const isLowPriority = function(todo) {
  return todo.priority === 1
}



/***********************
 * ITERATION FUNCTIONS *
 ***********************/

const names = function(todos) {
  // return map(todos, getTodoName)

  // Or, without map:
  const result = [];

  todos.forEach(function(todo) {
    result.push(getTodoName(todo));
  });

  return result;
}

const namesAndPriorities = function(todos) {
  // Map with anonymous function:
  return map(todos, function(todo) {
    const priority = todo.priority === 2 ? 'High' : 'Low';
    return `${todo.text} - ${priority}`
  })
}

const justNotComplete = function(todos) {
  return filter(todos, isNotComplete)

  // Or, without filter:
  // const result = [];

  // todos.forEach(function(todo) {
  //   if(isNotComplete(todo)) {
  //     result.push(todo);
  //   }
  // })

  // return result;

  // Or, without writing a new isNotComplete helper function:
  // return filter(todos, function(todo) {
  //   return !isComplete(todo)
  // })
}

const justComplete = function(todos) {
  return filter(todos, isComplete)
}

const priority2Only = function(todos) {
  return filter(todos, isHighPriority)
}

const priority1Only = function(todos) {
  return filter(todos, isLowPriority)
}

const notCompleteFirst = function(todos) {
  // return twoPileSort(todos, isNotComplete);

  // Or, without twoPileSort:
  const result = [];

  todos.forEach(function(todo) {
    if (isNotComplete(todo)) {
      result.unshift(todo)
    } else {
      result.push(todo);
    }
  })

  return result;
}

const priority2First = function(todos) {
  return twoPileSort(todos, isHighPriority)
}



module.exports = {
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
  notCompleteFirst,
  priority2First,
}