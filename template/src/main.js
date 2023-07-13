import { RemoveTaskCommand } from './commands/remove-task-command.js';
import { TaskEngine } from './engine/engine.js';
import { ConsoleIterator } from './services/console-iterator.js';
import { TaskRegistry } from './services/task-registry.js';

const taskRegistry = new TaskRegistry();

const removeTaskCommand = new RemoveTaskCommand(taskRegistry);

const taskEngine = new TaskEngine();

taskEngine.addCommand('remove', removeTaskCommand);

const consoleIterator = new ConsoleIterator();

(async () => {
  for await (const line of consoleIterator) {

    console.log(line);

  }
})();
