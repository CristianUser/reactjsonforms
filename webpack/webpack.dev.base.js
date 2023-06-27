var webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge').default;
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.ts',
    '../examples/src/index.ts',
    './example/index.ts',
  ],
  output: {
    publicPath: '/assets/',
    filename: 'bundle.js',
  },

  devServer: {
    hot: true,
    static: {
      directory: './example',
      serveIndex: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader?exportAsEs6Default',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
});
