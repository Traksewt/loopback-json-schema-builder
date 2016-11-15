# LoopBack JSON Schema Builder


This module can create [json schema](http://json-schema.org/) objects based on [loopback](https://loopback.io/) models.

This is useful if you want to quickly create forms for your loopback models using something
like [angular schema form](http://schemaform.io/).

## CLI Usage

node . (path to loopback root)/server/server.js

returns to console out a map of all schema models

## API

###loadAllModels(app, options)
loads schema for all loopback models associated with the given loopback app. Options is currently unused.

returns a map of model name to model schema

###loadModel(model)

returns a jsonSchema


## integrate with remote methods

```
var schemaBuilder = require('loopback-json-schema-builder');
module.exports = function (BaseModel) {
...

  BaseModel.jsonSchema = function(cb) {
    const schema = schemaBuilder.loadModel(BaseModel.modelName, this);
    cb(null, JSON.stringify(schema, null, 2));
  }

  BaseModel.setup = function() {
    // We need to call the base class's setup method
    BaseModel.base.setup.call(this);
    var BaseModelInternal = this;

    BaseModelInternal.remoteMethod(
      'jsonSchema',
      {
        description: 'Get the json schema for the given loopback model.',
        accessType: 'READ',
        returns: {arg: 'schema', type: 'string', root: true},
        isStatic: true,
        http: {path: '/json-schema', verb: 'GET'}
      }
    );

  }
...

}
```

**NOTE: This module only does loopback models TO json schema. If you are looking at going from json schema TO loopback models, checkout this neat project [loopback-jsonschema](https://github.com/backstage/loopback-jsonschema)**