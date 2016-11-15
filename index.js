var path = require('path');
var extend = require('util')._extend;
var loadModels = require('./services/loadModelsService');

var options = {};

if(require.main === module) {
  var appFile = path.resolve(process.argv[2]);
  var app = require(appFile);

  if (app.booting) {
    app.on('booted', runGenerator);
  } else {
    runGenerator(app);
  }
}



function runGenerator(app) {
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