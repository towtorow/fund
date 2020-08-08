
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/router.jsx',
  output: {
    path: __dirname + '/fund_management/static/js/',
    filename: 'bundle.js'
  },
  devtool: '#sourcemap',
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.jsx?$/,
        exclude: /(mode_modules)/,
        loaders: ['babel-loader']
      }
    ]

  }
}
