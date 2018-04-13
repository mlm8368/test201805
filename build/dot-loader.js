// var loaderUtils = require('loader-utils')
var dot = require('dot');
// var fs = require('fs');

module.exports = function(content) {
  /*
  if (this.cacheable) {
    this.cacheable();
  }
  */
  
  // dot.templateSettings.selfcontained = true;
  let templateSettings = {
    evaluate:    /\{\%([\s\S]+?)\%\}/g,
    interpolate: /\{\%=([\s\S]+?)\%\}/g,
    encode:      /\{\%!([\s\S]+?)\%\}/g,
    use:         /\{\%#([\s\S]+?)\%\}/g,
    define:      /\{\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\}/g,
    conditional: /\{\%\?(\?)?\s*([\s\S]*?)\s*\%\}/g,
    iterate:     /\{\%~\s*(?:\%\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\})/g,
    varname: 'it',
    strip: true,
    append: true,
    selfcontained: true
  };

  // var content2 = fs.readFileSync(content.resource);

  return "module.exports = " + dot.template(content, templateSettings);
};

/*
var loaderUtils = require('loader-utils')
var Px2rem = require('px2rem')

module.exports = function (source) {
  var query = loaderUtils.parseQuery(this.query)
  var px2remIns = new Px2rem(query)
  return px2remIns.generateRem(source)
}
*/