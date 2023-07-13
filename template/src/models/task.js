import { taskStatus } from '../common/task-status.enum.js';

export class Task {
  static #MIN_NAME_LENGTH = 4;
  static #MAX_NAME_LENGTH = 100;

  #status;
  #name;

  constructor(name, status) {
    if (typeof name !== 'string' || name.length < Task.#MIN_NAME_LENGTH || name.length > Task.#MAX_NAME_LENGTH) {
      throw new Error('Invalid name');
    }
    this.#name = name;
    this.status = status;
  }

  get name() {
    return this.#name;
  }

  get status() {
    return this.#status;
  }

  set status(value) {
    if (taskStatus[value] === undefined) {
      throw new Error('Invalid status!');
    }

    this.#status = value;
  }
}