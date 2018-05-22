'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.NODE_MODULES = 'all'
process.env.NODE_CONTROL = 'all'

let argv = require('minimist')(process.argv.slice(2))
if (argv._[0]) process.env.NODE_MODULES = argv._[0]
if (argv._[1]) process.env.NODE_CONTROL = argv._[1]

const ora = require('ora')
let rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

if (process.env.NODE_MODULES !== 'all' || process.env.NODE_TPL_EXT === '.htm' || process.env.NODE_TPL_EXT === '.html') {
  rm = function (opt,callback) {
    callback();
  }
}

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
