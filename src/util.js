import * as U from 'karet.util';
import * as R from 'ramda';
import toRegex from 'path-to-regexp';

export const preventDefault = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const isExternal = U.lift1Shallow(href => /^https?:\/\//.test(href));

const expandRoutes = R.compose(R.map(R.zipObj(['route', 'Component'])),
                               R.toPairs);

const addRegexes = R.map(entry => {
  const regex = toRegex(entry.route);
  regex.keys = regex.keys.map(R.prop('name'));

  return R.assoc('regex', regex, entry);
});

const sortStaticFirst = R.sortBy(({ regex }) => regex.keys.length === 0 ? 0 : 1);

export const prepareRoutes = R.compose(sortStaticFirst,
                                       addRegexes,
                                       expandRoutes);

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
