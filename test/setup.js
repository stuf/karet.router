require('babel-core/register')();
require('jsdom-global')(null, {
  url: 'http://127.0.0.1/'
});

const context = {};

Object.assign(global, { context });
