import { wait } from '../utils/utils.js';
import { Command } from './command.js';

export class RemoveTaskCommand extends Command {
  execute(name) {
    // this line below should be copied in every single command inheritor
    await wait(500);

    // missing method implementation
  }
}
