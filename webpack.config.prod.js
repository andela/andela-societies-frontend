const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['main', 'vendors'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    })
  ],
  devtool: 'hidden-source-map'
});
