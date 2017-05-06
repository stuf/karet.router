import * as U from 'karet.util';

export const preventDefault = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const isExternal = U.lift1Shallow(href => /^https?:\/\//.test(href));

export const invariant = (cond, format, ...args) => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV !== 'production') {
    if (!format) {
      throw new Error('message argument required');
    }
  }

  if (!cond) {
    let error;
    if (!format) {
      error = new Error('Minified exception');
    }
    else {
      let argIndex = 0;
      error = new Error(
        format.replace(/%s/g, () => args[argIndex++])
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1;
    throw error;
  }
};
