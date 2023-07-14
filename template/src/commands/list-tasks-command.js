import { wait } from '../utils/utils.js';
import { Command } from './command.js';

export class ListTasksCommand extends Command {

  async execute(strToContain = '') {
    await wait(500);

    try {

      let resultElements = ``;

      for (const task of this.taskRegistry.tasks) {
        if (await task.name.includes(strToContain)) {
          resultElements += `Task: ${task.name} (${task.status})\n`;
        }
      }

      return console.log(resultElements.trimEnd());

    } catch (e) {
      return console.log(e.message);
    }
  }
}

