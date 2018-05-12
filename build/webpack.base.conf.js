'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const buildEntries = require('./build-entries')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  exclude: /node_modules/,
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: buildEntries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  /*
  resolveLoader: {
    // 指定默认的loader路径，否则依赖走到上游会找不到loader
    // root: path.join(__dirname, 'node_modules'),
    alias: { // 给自己写的loader设置别名
      "dot-loader": path.resolve( __dirname, "./dot-loader.js" )
    }
  },
  */
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader?cacheDirectory=true',
        options: vueLoaderConfig,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.dot$/,
        loader: path.resolve( __dirname, "./dot-loader.js" ),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit:4000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
