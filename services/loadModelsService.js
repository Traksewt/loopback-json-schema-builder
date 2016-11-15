'use strict';
module.exports = {
  loadModels, generateSchema
};

const inflection = require('inflection');

function loadModels(app, options) {
  const ret = {};
  Object.keys(app.models).forEach((modelName) => {
    let schemaModel = generateSchema(modelName, app.models[modelName]);
    ret[modelName] = schemaModel;
  })
  return ret;
}

function generateSchema(modelName, model) {
  const jsonSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    title: inflection.titleize(inflection.underscore(modelName)),
    type: 'object',
    properties: {},
    required: []
  };

  const properties = model.definition.properties;
  Object.keys(properties).forEach((key) => {
    jsonSchema.properties[key] = {
      title: inflection.titleize(inflection.underscore(key)),
      type: properties[key]['type'].name.toLowerCase()
    };
    if (properties[key]['required']) {
      jsonSchema.required.push(key);
    }
  });

  return jsonSchema;
}

