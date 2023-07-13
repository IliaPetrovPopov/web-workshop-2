export class Command {
  #taskRegistry;

  constructor(taskRegistry) {
    this.#taskRegistry = taskRegistry;
  }

  get taskRegistry() {
    return this.#taskRegistry;
  }

  execute(...args) {
    throw new Error('Override in child classes!');
  }
}