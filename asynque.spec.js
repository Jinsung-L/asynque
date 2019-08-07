const { AsynQue, Task } = require('./asynque');

const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

describe('AsynQue', () => {
  describe('getIndexToInsert', () => {
    it('should return target position to insert new task', () => {
      const queue = new AsynQue({
        tasks: [
          new Task({ priority: -3, value: 0 }),
          new Task({ priority: 0, value: 1 }),
          new Task({ priority: 0, value: 2 }),
          new Task({ priority: 3, value: 3 }),
          new Task({ priority: 3, value: 4 }),
        ],
      });

      expect(queue.getIndexToInsert(-5)).toBe(0);
      expect(queue.getIndexToInsert(0)).toBe(3);
      expect(queue.getIndexToInsert(2)).toBe(3);
      expect(queue.getIndexToInsert(3)).toBe(5);
    });
  });

  describe('queue', () => {
    it('should be able to enque following priority', () => {
      const tasks = [
        new Task({ priority: 0, task: 1 }),
        new Task({ priority: 3, task: 3 }),
        new Task({ priority: 3, task: 4 }),
        new Task({ priority: -3, task: 0 }),
        new Task({ priority: 0, task: 2 }),
      ];

      const queueAfter = [
        new Task({ priority: -3, task: 0 }),
        new Task({ priority: 0, task: 1 }),
        new Task({ priority: 0, task: 2 }),
        new Task({ priority: 3, task: 3 }),
        new Task({ priority: 3, task: 4 }),
      ];

      const queue = new AsynQue();
      tasks.forEach(task => queue.enque(task));

      expect(queue.queue.map(task => task.task)).toStrictEqual(queueAfter.map(task => task.task));
    });

    it('should be able to deque following priority', () => {
      const tasks = [
        new Task({ priority: 0, task: 1 }),
        new Task({ priority: 3, task: 3 }),
        new Task({ priority: 3, task: 4 }),
        new Task({ priority: -3, task: 0 }),
        new Task({ priority: 0, task: 2 }),
      ];

      const queueAfter = [
        new Task({ priority: -3, task: 0 }),
        new Task({ priority: 0, task: 1 }),
        new Task({ priority: 0, task: 2 }),
        new Task({ priority: 3, task: 3 }),
        new Task({ priority: 3, task: 4 }),
      ];

      const queue = new AsynQue();
      tasks.forEach(task => queue.enque(task));

      expect(queue.deque().task).toStrictEqual(queueAfter[0].task);
      expect(queue.deque().task).toStrictEqual(queueAfter[1].task);
      expect(queue.deque().task).toStrictEqual(queueAfter[2].task);
      expect(queue.deque().task).toStrictEqual(queueAfter[3].task);
      expect(queue.deque().task).toStrictEqual(queueAfter[4].task);
    });
  });

  describe('enque', () => {
    it('should return a promise that resolves when the task is done', async () => {
      const queue = new AsynQue();

      const promise = queue.enque(new Task({
        task: () => 'Hello, world!',
      }));

      const result = delay(300).then(() => queue.deque().run());

      await expect(result).resolves.toBe('Hello, world!');
      await expect(promise).resolves.toBe('Hello, world!');
    });

    it('should return a promise that rejects when the task fails', async () => {
      const queue = new AsynQue();

      const promise = queue.enque(new Task({
        task: () => {
          throw new Error('Something went wrong!');
        },
      }));

      const result = delay(300).then(() => queue.deque().run());

      await expect(result).rejects.toThrow('Something went wrong!');
      await expect(promise).rejects.toThrow('Something went wrong!');
    });
  });
});
