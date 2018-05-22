'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  viewEXT: '"'+process.env.NODE_TPL_EXT+'"'
})
