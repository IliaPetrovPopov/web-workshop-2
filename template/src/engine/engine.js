
import { Command } from '../commands/command.js';

export class TaskEngine {
  #commands = new Map();

  addCommand(name, command) {
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('Invalid name!');
    }

    if (!(command instanceof Command)) {
      throw new Error('Invalid command');
    }
    this.#commands.set(name, command);
  }

  executeCommand(name, ...args) {
    if (!this.#commands.has(name)) {
      throw new Error('Invalid command!');
    }

    return this.#commands.get(name).execute(...args);
  }
}