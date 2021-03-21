const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  output: {
    publicPath: './'
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
              context: path.resolve(__dirname, 'src/images'),
              name: '[path][name].[ext]',
              publicPath: '../../assets/images',
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
              context: path.resolve(__dirname, 'src/fonts'),
              name: '[path][name].[ext]',
              publicPath: '../../assets/fonts',
              outputPath: 'assets/fonts',
              limit: 10000
            }
          }
        ]
      }
    ]
  }
});
