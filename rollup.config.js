import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const NODE_ENV = process.env.NODE_ENV;

export default {
  entry: 'src/index.js',
  exports: 'named',
  external: [
    'karet', 'react', 'kefir', 'karet.util', 'history', 'partial.lenses', 'prop-types',
    'ramda'
  ],
  globals: {
    ramda: 'R',
    kefir: 'Kefir',
    karet: 'karet',
    'karet.util': 'U',
    'partial.lenses': 'L',
    history: 'H',
    'prop-types': 'P'
  },
  plugins: [
    process.env.NODE_ENV &&
      replace({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    }),

    NODE_ENV === 'production' && uglify()
  ].filter(x => x)
};
