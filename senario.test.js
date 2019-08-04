const { AsynQue, Task } = require('./asynque');


describe('README', () => {
  test('Quick Start', () => {
    const queue = new AsynQue();
    const retrieveHello = new Task({ task: name => `Hello, ${name}!` });

    const promise = queue.enque(retrieveHello).then(result => `The task is done: ${result}`);
    // > The task is done: Hello, AsynQue!

    const task = queue.deque();
    task.run('AsynQue'); // The promise will resolve at this moment.

    return expect(promise).resolves.toBe('The task is done: Hello, AsynQue!');
  });

  test('Task Priority', () => {
    const queue = new AsynQue();
    queue.enque(new Task({ task: () => 'Run this after.', priority: 10 }));
    queue.enque(new Task({ task: () => 'Run this first!', priority: -10 }));

    expect(queue.deque().run()).toBe('Run this first!');
    expect(queue.deque().run()).toBe('Run this after.');
  });
});
