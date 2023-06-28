const merge = require('webpack-merge');
const baseConfig = require('../../../webpack/webpack.build.base.js');

module.exports = merge(baseConfig, {
  output: {
    filename: 'jsonforms-material.js',
    library: 'JSONFormsMaterial',
  },
  externals: [
    {
      '@reactjsonforms/core': 'JSONFormsCore',
      '@reactjsonforms/react': 'JSONFormsReact',
      react: 'React',
      redux: 'Redux',
      'react-redux': 'ReactRedux',
    },
    /@material-ui\/core\/.*/,
    /@material-ui\/icons\/.*/,
    /@material-ui\/lab\/.*/,
  ],
});
