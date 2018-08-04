const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const glob = require('glob');

const env = require('../config/prod.env')
const appBuildModules = env.appBuildModules[process.env.NODE_APPNAME]

let buildEntries = {};

/*获取所有模块的文件夹名*/
/*
const modules = fs.readdirSync(path.join(utils.resolve('src'),'modules'));

for (let moduleName of modules) {
  if ( process.env.NODE_MODULES !== 'all' && process.env.NODE_MODULES !== moduleName) continue;
  buildEntries[moduleName] = path.join(utils.resolve('src'),'modules',moduleName,'main.js');
}
*/
let globalPath = utils.resolve('src')+'/modules/**/*'+process.env.NODE_TPL_EXT;
glob.sync(globalPath).forEach((pagePath)=>{
  var ext = path.extname(pagePath),
    basename = path.basename(pagePath, ext),
    modulename = path.basename(pagePath.replace('/' + basename + ext,'')),
    modules = path.basename(pagePath.replace('/' + modulename + '/' + basename + ext,''));
  if ( (modules === 'modules') && (appBuildModules.indexOf(modulename) !== -1) &&
   (process.env.NODE_MODULES === 'all' || (process.env.NODE_MODULES === modulename && (process.env.NODE_CONTROL === 'all' || process.env.NODE_CONTROL === basename)))) {
    pageName = modulename + '/' + basename;
    buildEntries[pageName] = pagePath.replace(ext,'.ts');
  }
});
// console.log(buildEntries);
module.exports = buildEntries;
