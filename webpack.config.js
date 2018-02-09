/* eslint global-require: "off" */
/* eslint import/no-extraneous-dependencies: ["off", {"devDependencies": false}] */
/* postcss includes the autoprefixer node module */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

const autoprefixer = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')]
  }
});

const config = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true
              }
            },
            autoprefixer()
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: path.resolve(__dirname, 'src/images/'),
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    new UglifyWebpackPlugin({
      exclude: /node_modules/,
      sourceMap: false
    }),
    new HtmlWebpackPlugin({
      title: 'project',
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new CleanWebpackPlugin(['build'])
  ],

  devServer: {
    // contentBase: path.join(__dirname, 'build'),
    compress: false,
    port: 9000
  }
};

module.exports = config;
