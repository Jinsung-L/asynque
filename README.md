# asynque
[![npm version](https://badge.fury.io/js/asynque.svg)](https://badge.fury.io/js/asynque)

Simple queue handling asynchronous tasks.

# Installation
`npm i asynque`

# Quick Start
```javascript
const { AsynQue, Task } = require('asynque');


const queue = new AsynQue();
const retrieveHello = new Task({ task: name => `Hello, ${name}!` });

queue.enque(retrieveHello).then(result => {
  console.log(`The task is done: ${result}`);
  // > The task is done: Hello, AsynQue!
});

// ... do some works, and later ...

const task = queue.deque();
const result = task.run('AsynQue');    // The promise will resolve at this moment.
// > Hello, AsynQue!
```

## Task Priority
```javascript
const { AsynQue, Task } = require('asynque');


const queue = new AsynQue();
queue.enque(new Task({ task: () => 'Run this after.', priority: 10}));
queue.enque(new Task({ task: () => 'Run this first!', priority: -10}));

console.log(queue.deque().run());   // > Run this first!
console.log(queue.deque().run());   // > Run this after.
```

## Error Handling
```javascript
const { AsynQue, Task } = require('asynque');


const queue = new AsynQue();
const taste = new Task({
  task: flavor => {
    if (flavor === 'Mint') {
      throw new Error('I hate mint');
    }

    return `It is ${flavor} flavor!`;
  },
});

queue.enque(taste)
  .then(result => {
    console.log(result);    // It's not executed because the error is thrown.
  })
  .catch(error => {
    console.error(error);
    // > I hate mint
  });

// ... do some works, and later ...

const task = queue.deque();

try {
  task.run('Mint');   // The promise will reject at this moment.
} catch (error) {
  console.error(error);
  // > Error: I hate mint
}
```