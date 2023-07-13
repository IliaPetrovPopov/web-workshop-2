<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

# Tasks manager

### 1. Description

Console tool for reading and executing user commands for managing tasks.

<br>

### 2. Project information

- Language and version: **JavaScript ES2020**
- Platform and version: **Node 14.0+**
- Core Packages: **ESLint**

<br>

### 3. Goals

The **goal** is to fully implement the tasks management system so that the user can pass on commands as an input on the console and see the results of those commands. The solution must make use the **async/await** syntax for increased readability and code reasoning.

<br>

### 4. Project structure

The project has multiple folders with different responsibilities:

- `common` - contains the enums
- `models` - contains the single `Task` model
- `utils` - contains `utils.js` which gives you a function you can use to simulate a **pause** in the code flow
- `services` - contains the `TaskRegistry` class that acts as a container for model instances, and the `ConsoleIterator` which is the class that wraps events and exposes them in the **async/await** flow
- `commands` - contains the base `Command` class and all of its derivatives, each commands is responsible for a single action and each command returns a string as a result of the action taken (or a string describing the error if there was any)
- `engine` - contains the engine class that is responsible for registering tasks and executing them

You are **allowed** to modify the contents of two folders only - `commands` and `engine` - that means add/remove methods and fields/properties if necessary, change method signatures and implementations, change if and what one class inherits, etc.

<br>

### 5. The **ConsoleIterator**

This class uses the async iterator pattern to wrap multiple events into an endless **iterable** collection of promises, i.e. can be iterated through **for-of**, but in the case of this solution you will use the **for-await** syntax.

```js
const consoleIterator = new ConsoleIterator();

(async () => {
  // every time you enter something on the console a new value will be produced in the consoleIterator
  // it will be awaited and the result written in the "line" variable, i.e. "line" will be a string
  // this in a way is similar to the event loop as it will continue to "listen" and "wait" for
  // every new line written on the console
  for await (const line of consoleIterator) {

    console.log(line);

  }
})();
```

Once we have a way to convert events to promises it's easy to make them work in the **async/await** flow.

<br>

### 6. Working with commands

We already have the base code for processing a command. Each time you type something on the console and press **Enter** the text you typed will be *awaited* in the **for-await** loop and the result (the string you entered) will be recorded in the `line` variable.

What is a command anyway? It's nothing more than a sequence of 1 or more words separated by a blank space. I.e. `add Cook Pending` is a command. The first word is the actual command name, and all of the rest words are the command's parameters.

In `main.js` you can already see one command being initialized and registered:

```js
// pass the TaskRegistry dependency to the command's constructor
const removeTaskCommand = new RemoveTaskCommand(taskRegistry);

const taskEngine = new TaskEngine();

// register the "remove" command, i.e. "remove" should be the first word of the "line"
taskEngine.addCommand('remove', removeTaskCommand);
```

You should separate the command and the rest of the parameters and pass them to the engine's `executeCommand` method. This method is almost completely implemented, but something might be missing / not right. You will find out what it is.

This method checks if a command has been registered and passes the parameters (all the other words in "line" after the first) to the command's `execute` method. Don't forget parameters are strings. Finally, the `executeCommand` method returns the result from the execution of the command. The returned result should be logged to the console as a **string**.

<br>

### 7. The `Command`

All four commands inherit from the base `Command` class. Each command has an `execute` method that accepts varying amount of parameters depending on the type of the command. Each command makes use of the `TaskRegistry` dependency which holds all of the created tasks.

There are four available commands and here are examples (as written on the console):

- `add Cook Pending` - this should reach the `AddTaskCommand` which in turn should create a new task with the given name and status and add it to the registry. Upon successful adding of the task, the `execute` method should return `Task added successfully!`, and in case of an error it should return `Problem with adding the task: ${e.message}` where `e` is the instance of the error
- `update Cook Done` - this should reach the `UpdateTaskCommand` and update the status of the task. If a task with the given name does not exist, it should return `Task with name ${name} doesn't exist!`. If successful, it should return `Task updated successfully!`, in case of an error it should return `Problem with updating the task: ${e.message}`
- `list` or `list ook` - this should reach the `ListTasksCommand`. The parameter is optional, if it's not passed, it should default to an empty string, in any other way this is a **partial** task name, i.e. list all tasks containing this substring (in the example "ook"). If there are no tasks or at least no tasks containing the substring the `execute` method should return `No tasks matching search criteria`, else it should return a multiline string where each task is listed on a new line in the following format: `Task: taskName (status)`, i.e. `Task: Cook (Done)`
- `remove Cook` - this should reach the `RemoveTaskCommand` and remove the task. If successful, it should return `Task removed successfully!`, in case of an error it should return `Problem with removing the task: ${e.message}`

The `RemoveTaskCommand` has a partial implementation:

```js
export class RemoveTaskCommand extends Command {
  execute(name) {
    // this line below should be copied in every single command inheritor
    await wait(500);

    // missing method implementation
  }
}
```

The `await wait(500)` simulates a program **pause** and it should be included in every single `execute` override.

<br>

### 8. Things to look out for

Considering events have been encapsulated in the *async/await* flow, you need to adapt the rest of the program to that flow as well. Errors happening in *async* functions can only be caught inside another *async* function, only if they are *awaited*, so, pay attention and ***await* every single *async* function**.

All **errors must be handled in command classes**, meaning the `execute` method should always return а result and never throw.

You are not allowed to use `.then()` and `.catch()` and must exclusively work with *async/await* (not counting code already written for you).

<br>

### 9. Testing the program

Here are a few commands and their results (each result listed right after the command) you can use to test the correctness of your implementation:

```txt
list
No tasks matching search criteria
add Cook Pending
Task added successfully!
add Learn Pending
Task added successfully!
add Vacation Immediate
Problem with adding the task: Invalid status!
update learn done
Task with name learn doesn't exist!
update Learn done
Problem with updating the task: Invalid status!
update Learn Done
Task updated successfully!
list
Task: Cook (Pending)
Task: Learn (Done)
remove Learn
Task removed successfully!
add HaveFun Done
Task added successfully!
list Fun
Task: HaveFun (Done)
```
