const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {},
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
