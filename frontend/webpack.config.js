'use strict';

var webpack = require('webpack'),
  path = require('path');

var siftRootPath = path.resolve('../');

module.exports = {
  entry: {
		controller: [ 'babel-polyfill', './src/scripts/controller.js'],
		view: [ 'babel-polyfill', './src/scripts/view.js'],
	},
  output: {
		filename: '[name].umd-es2015.min.js',
		path: path.join(__dirname, 'public', 'dist', 'js'),
	},
  cache: true,
  resolve: {
   extensions: [ '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-es2017'),
          ]
        }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: 'source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
