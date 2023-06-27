const merge = require('webpack-merge').default;
const baseConfig = require('../../../webpack/webpack.dev.base.js');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new copyWebpackPlugin({
      patterns: [{ from: '../examples-react/src/logo.svg' }],
    }),
  ],
});
