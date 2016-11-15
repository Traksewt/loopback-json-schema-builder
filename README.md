# LoopBack JSON Schema Builder


This module can create [json schema](http://json-schema.org/) objects based on [loopback](https://loopback.io/) models.

This is useful if you want to quickly create forms for your loopback models using something
like [angular schema form](http://schemaform.io/).

## Usage

node . (path to loopback root)/server/server.js

returns to console out a map of all schema models

## API

###loadAllModels(app, options)
loads schema for all loopback models associated with the given loopback app. Options is currently unused.

returns a map of model name to model schema

###loadModel(model)

returns a jsonSchema
