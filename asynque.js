class Task {
  constructor({ task, priority }) {
    this.task = task;
    this.priority = priority;
  }
}

class AsynQue {
  static priorityComparator(a, b) {
    return a.priority - b.priority;
  }

  constructor({ tasks } = { tasks: [] }) {
    this.queue = tasks;
  }

  get length() {
    return this.queue.length;
  }

  get isEmpty() {
    return this.queue.length === 0;
  }

  getIndexToInsert(priority) {
    let lo = 0;
    let hi = this.length;

    while (lo + 1 < hi) {
      const mid = Math.floor((lo + hi) / 2);

      if (this.queue[mid].priority <= priority) { lo = mid; } else { hi = mid; }
    }

    let i = lo;
    while (i < this.length && this.queue[i].priority <= priority) { i += 1; }

    return i;
  }

  enque(props) {
    const task = new Task(props);
    const index = this.getIndexToInsert(task.priority);
    this.queue.splice(index, 0, task);
  }

  deque() {
    return this.queue.shift();
  }

  front() {
    return this.queue[0];
  }
}

module.exports = { AsynQue, Task };
