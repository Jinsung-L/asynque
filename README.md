# asynque
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
task.run("AsynQue");    // The promise will resolve at this moment.
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