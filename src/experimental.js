/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Important: Run using the --harmony flag.

// Tests for Node.js v10+
// #1 - Class private, public instance.

const logger = console;

logger.info('Program started.');

module.exports.Test = class Test {

  // Public.
  mData = 'Hi';

  // Private.
  #test = 10;

  constructor() {

    logger.group('CTOR:');
    logger.info(this.#test, this.mData);
    logger.groupEnd();

  }

  runTests() {

    logger.group('RunTests:');
    logger.info(this.#test, this.mData);
    logger.groupEnd();

  }

}
