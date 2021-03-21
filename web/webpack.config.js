const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const configuration = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].js',
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-flow',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader'
          },
          {
            // First we transform SASS to standard CSS
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, 'src/styles/styles.scss')
            }
          }
        ]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
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
              name: '[name].[ext]',
              publicPath: '../../assets/fonts',
              outputPath: 'assets/fonts',
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@services': path.resolve(__dirname, 'src/app/services'),
      '@shared': path.resolve(__dirname, 'src/app/shared'),
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@images': path.join(__dirname, 'src/images')
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title : 'Nintendo Switch UI',
      template: './public/index.html',
      manifest: './public/manifest.json'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/favicon.ico',
          to: './favicon.ico'
        }
      ]
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      ignored: 'node_modules'
    }
  }
}

module.exports = configuration;
