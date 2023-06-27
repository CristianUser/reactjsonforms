const merge = require('webpack-merge').default;
const baseConfig = require('../../../webpack/webpack.dev.base.js');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new copyWebpackPlugin({
      patterns: [{ from: '../examples-react/src/logo.svg' }],
    }),
  ],
  resolve: {
    // Add '.ts' as resolvable extensions.
    extensions: ['.ts', '.js', '.tsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
            ],
          },
        },
      },
      // Add the following rule
      {
        test: /\.js$/,
        include: /node_modules\/@zag-js\/element-size/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
});
