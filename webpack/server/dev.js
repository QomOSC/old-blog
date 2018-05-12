const nodeExternals = require('webpack-node-externals');
const babelConfig = require('../babel.config.json');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: babelConfig.presets,
          plugins: babelConfig.plugins,
        },
      }
    ]
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '../../', 'src/server'),
    },
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  watch: true,
};
