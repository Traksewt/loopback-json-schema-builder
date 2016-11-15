var path = require('path');
var extend = require('util')._extend;
var loadModels = require('./services/loadModelsService');

var appFile = path.resolve(process.argv[2]);
var options = {};

var app = require(appFile);
if(require.main === module) {

  if (app.booting) {
    app.on('booted', runGenerator);
  } else {
    runGenerator();
  }
}



function runGenerator() {
  var pathArray = appFile.split(path.sep);
  options = extend({
    ngModuleName: 'lbServices',
    apiUrl: '/',
    includeCommonModules: true,
    namespaceModels: false,
    loopbackModelSuffix: '',
    namespaceDelimiter: '.',
    modelsToIgnore: [],
  }, options);

  var models = loadModels.loadModels(app, options);

  console.log('app models: ' + JSON.stringify(models, null, 2));

}

module.exports = {
  loadAllModels: loadModels.loadModels,
  loadModel: loadModels.generateSchema
}