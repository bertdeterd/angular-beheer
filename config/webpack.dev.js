var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const devSystem = "http://encsapdejci.ee.intern:8010";

const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
 
  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
          "/proxy": {
            target: devSystem,
            changeOrigin: true,
            secure: false,
            pathRewrite: {
              "^/proxy": ""
            }
          }
        }
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new WriteFilePlugin()
  ]
 
});
