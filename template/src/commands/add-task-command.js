import { Task } from '../models/task.js';
import { wait } from '../utils/utils.js';
import { Command } from './command.js';

export class AddTaskCommand extends Command {

    async execute(name, status) {
      // this line below should be copied in every single command inheritor
      await wait(500);
  
      try {
        const taskToAdd = new Task(name, status);
        await this.taskRegistry.addTask(taskToAdd);
  
        // console.log('Task added successfully!');
        return console.log('Task added successfully!');
      } catch (e) {
        // console.log(`Problem with adding the task: ${e.message}`)
        return console.log(`Problem with adding the task: ${e.message}`);
      }
    }
  }
