const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['eslint-loader', 'babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['main', 'vendors']
    })
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    inline: true,
    port: 3000
  }
});
