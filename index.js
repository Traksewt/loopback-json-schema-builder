'use strict';
const path = require('path');
const extend = require('util')._extend;
const loadModels = require('./services/loadModelsService');

let options = {};
if(require.main === module) {
  const appFile = path.resolve(process.argv[2]);
  const app = require(appFile);

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

  const models = loadModels.loadModels(app, options);

  console.log('app models: ' + JSON.stringify(models, null, 2));

}

module.exports = {
  loadAllModels: loadModels.loadModels,
  loadModel: loadModels.generateSchema
}
