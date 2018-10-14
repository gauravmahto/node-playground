/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Tests for Node.js v10+
// #1 - Promise.finally
// #2 - Async Generators and Iterators

const logger = console;

logger.info('Program started.');

function asyncTask<T>(val: T, resolve: boolean, wait: number): Promise<T> {

  return new Promise((res, rej) => {

    setTimeout(() => {

      return resolve ? res(val) : rej(val);

    }, wait);

  });

}

// Test#1 - Promise.finally
function getPromise<T>(val: T, resolve = true, wait = 1000): Promise<T> {

  return asyncTask(val, resolve, wait)
    .then((out) => {

      logger.info('Got response from asyncTask. Passing on...');

      return out;

    })
    .catch((err) => {

      logger.info('Caught error. Passing on...');

      return Promise.reject(err);

    })
    .finally(() => {

      logger.info('getPromise() completed.');

    });

}

async function test<T>(val: T, success = true, wait = 1000): Promise<T> {

  const out = await getPromise(val, success, wait);

  return out;

}

(async () => {

  logger.group('Output Test#Finally:');

  const t1 = await test('Hi!', true);
  logger.info('#1', t1);

  try {

    const t2 = await test('Oops!', false);
    logger.info('#2', t2);

  } catch (err) {

    logger.error('Error: ' + err);

  } finally {

    logger.groupEnd();

  }

  // Test#2 - Async Generators and Iterators
  logger.group('Output Test#asyncIterator:');

  async function* generator() {

    yield test('Count#1');
    yield test('Count#2', true, 2000);
    yield test('Count#3', true, 3000);
    yield test('Error#1', false);
    yield test('Count#4');

  }

  try {

    for await (const val of generator()) {

      logger.info(val);

    }

  } catch (err) {

    logger.error(err);

  } finally {

    logger.groupEnd();

  }

  logger.info('Program ends.');

})();
