'use strict'

var mongoose = require('mongoose');

var definition = {
    email: {
        type: String,
        required: true,
        /*match: '/.+@.+\..+/',*/
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loggedInCount: {
        type: Number,
        default: 0
    }
};

var schemaName = 'User';
var collectionName = 'users';
var schema = new mongoose.Schema(definition);

module.exports.schemaName = schemaName;
module.exports.collectionName = collectionName;
module.exports.definition = definition;
module.exports.schema = schema;
module.exports.model = mongoose.model(schemaName, schema, collectionName);