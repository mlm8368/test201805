'use strict'
// 打包时模块区分
const appBuildModules = {
  student: ['home', 'sbaobao', 'sxiaoyuan', 'sbanji', 'sbamaquan', 'smore'],
  teacher: ['home']
}

module.exports = {
  NODE_ENV: '"production"',
  viewEXT: '"'+process.env.NODE_TPL_EXT+'"',
  appBuildModules: appBuildModules
}
