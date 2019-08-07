const { AsynQue, Task } = require('./asynque');


describe('README', () => {
  test('Quick Start', async () => {
    const queue = new AsynQue();
    const retrieveHello = new Task({ task: name => `Hello, ${name}!` });

    const promise = queue.enque(retrieveHello).then(result => `The task is done: ${result}`);
    const task = queue.deque();

    expect(task.run('AsynQue')).toBe('Hello, AsynQue!');
    await expect(promise).resolves.toBe('The task is done: Hello, AsynQue!');
  });

  test('Task Priority', () => {
    const queue = new AsynQue();
    queue.enque(new Task({ task: () => 'Run this after.', priority: 10 }));
    queue.enque(new Task({ task: () => 'Run this first!', priority: -10 }));

    expect(queue.deque().run()).toBe('Run this first!');
    expect(queue.deque().run()).toBe('Run this after.');
  });

  test('Error Handling', async () => {
    const queue = new AsynQue();
    const taste = new Task({
      task: (flavor) => {
        if (flavor === 'Mint') {
          throw new Error('I hate mint');
        }

        return `It is ${flavor} flavor!`;
      },
    });

    const promise = queue.enque(taste);
    const task = queue.deque();

    expect(() => task.run('Mint')).toThrow('I hate mint');
    await expect(promise).rejects.toThrow('I hate mint');
  });
});
