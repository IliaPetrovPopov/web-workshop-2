import { Task } from '../models/task.js';

export class TaskRegistry {
  #tasks = new Map();

  async addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Invalid task');
    }
    if (this.#tasks.has(task.name)) {
      throw new Error('Task has already been added!');
    }

    this.#tasks.set(task.name, task);
  }

  async removeTask(taskName) {
    if (!this.#tasks.has(taskName)) {
      throw new Error(`Task doesn't exist!`);
    }

    this.#tasks.delete(taskName);
  }

  get tasks() {
    return [...this.#tasks.values()];
  }
}