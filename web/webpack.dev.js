const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  target: 'web', // Enable live reload

  output: {
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
              limit: 15000
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
              limit: 10000
            }
          }
        ]
      }
    ]
  }
});
