export class ConsoleIterator {
  #resolve;

  async *[Symbol.asyncIterator]() {
    process.stdin.on('data', data => {
      this.#resolve(data.toString().trim());
    });

    while (true) {
      yield await new Promise(resolve => this.#resolve = resolve);
    }
  }
}
