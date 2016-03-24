var fs = require('fs');
var jade = require('jade');
var mkdirp = require('mkdirp');
var progeny = require('progeny');
var sysPath = require('path');

// perform a deep cloning of an object
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
  }
  return copy;
}

function formatPath(path) {
  return path;
}

function JadeCompiler(cfg) {
  if (cfg == null) cfg = {};
  var defaultBaseDir = sysPath.join(cfg.paths.root, 'app');
  var jade = cfg.plugins && cfg.plugins.jadeStatic;
  var config = (jade && jade.options) || jade;

  this.options = clone(config) || {};
  this.options.compileDebug = false;
  this.options.basedir = (config && config.basedir) || defaultBaseDir;
  this.options.locals = (config && config.locals) || {};
  this.options.staticPath = cfg.paths.public;
  this.options.formatPath = (config && config.formatPath) || formatPath;
  this.options.extension = (config && config.extension) || '.html';

  this.getDependencies = progeny({rootPath: this.options.basedir});
}

JadeCompiler.prototype.brunchPlugin = true;
JadeCompiler.prototype.type = 'template';
JadeCompiler.prototype.extension = 'jade';

JadeCompiler.prototype.compile = function(data, filepath, callback) {
  var options = clone(this.options);
  var html, buildPath, buildDir;

  buildPath = this.buildPath(filepath);
  buildDir = sysPath.dirname(buildPath);

  options.filename = filepath;
  options.locals.__ = { filepath: filepath, directory: buildDir };

  try {
    html = jade.compile(data, options)(options.locals);
    mkdirp(buildDir, function(err) {
      if (err) {
        callback(err, null);
      } else {
        fs.writeFileSync(buildPath, html);
        callback(null, '');
      }
    });
  } catch (err) {
    callback(err, null);
  }
};

JadeCompiler.prototype.buildPath = function(path) {
  return this.options.staticPath + "/" +
         this.options.formatPath(path) +
         this.options.extension;
};

JadeCompiler.prototype.include = [
  sysPath.resolve(require.resolve('jade/package.json'), '..', 'runtime.js')
];

module.exports = JadeCompiler;
