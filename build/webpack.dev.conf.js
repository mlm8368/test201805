'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const glob = require('glob')

let env = require('../config/dev.env')
  env = merge(env, {
    appName: '"'+process.env.NODE_APPNAME+'"'
  })

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

let pages = ((globalPath)=>{
  let htmlFiles = {},
    pageName;

  glob.sync(globalPath).forEach((pagePath)=>{
    var ext = path.extname(pagePath),
      basename = path.basename(pagePath, ext),
      modulename = path.basename(pagePath.replace('/' + basename + ext,''));
    if ( process.env.NODE_MODULES === 'all' || (process.env.NODE_MODULES === modulename && (process.env.NODE_CONTROL === 'all' || process.env.NODE_CONTROL === basename))) {
      pageName = modulename + '/' + basename;
      htmlFiles[pageName] = {};
      htmlFiles[pageName]['ext'] = ext;
      htmlFiles[pageName]['path'] = pagePath;
    }
  });
  return htmlFiles;
})(utils.resolve('src')+'/modules/**/*'+process.env.NODE_TPL_EXT);

for (let entryName in pages) {
  let conf = {
    // 生成出来的html文件名
    filename: entryName+pages[entryName]['ext'],
    // 每个html的模版，这里多个页面使用同一个模版
    template: pages[entryName]['path'],
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: ['vendor','manifest',entryName],
  };
  /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = devWebpackConfig;
