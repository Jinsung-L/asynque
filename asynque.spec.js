const { AsynQue, Task } = require('./asynque');

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
        new Task({ priority: 0, value: 1 }),
        new Task({ priority: 3, value: 3 }),
        new Task({ priority: 3, value: 4 }),
        new Task({ priority: -3, value: 0 }),
        new Task({ priority: 0, value: 2 }),
      ];

      const queueAfter = [
        new Task({ priority: -3, value: 0 }),
        new Task({ priority: 0, value: 1 }),
        new Task({ priority: 0, value: 2 }),
        new Task({ priority: 3, value: 3 }),
        new Task({ priority: 3, value: 4 }),
      ];

      const queue = new AsynQue();
      tasks.forEach(task => queue.enque(task));

      expect(queue.queue).toStrictEqual(queueAfter);
    });

    it('should be able to deque following priority', () => {
      const tasks = [
        new Task({ priority: 0, value: 1 }),
        new Task({ priority: 3, value: 3 }),
        new Task({ priority: 3, value: 4 }),
        new Task({ priority: -3, value: 0 }),
        new Task({ priority: 0, value: 2 }),
      ];

      const queueAfter = [
        new Task({ priority: -3, value: 0 }),
        new Task({ priority: 0, value: 1 }),
        new Task({ priority: 0, value: 2 }),
        new Task({ priority: 3, value: 3 }),
        new Task({ priority: 3, value: 4 }),
      ];

      const queue = new AsynQue();
      tasks.forEach(task => queue.enque(task));

      expect(queue.deque()).toStrictEqual(queueAfter[0]);
      expect(queue.deque()).toStrictEqual(queueAfter[1]);
      expect(queue.deque()).toStrictEqual(queueAfter[2]);
      expect(queue.deque()).toStrictEqual(queueAfter[3]);
      expect(queue.deque()).toStrictEqual(queueAfter[4]);
    });
  });
});
