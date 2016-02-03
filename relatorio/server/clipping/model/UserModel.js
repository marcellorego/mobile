'use strict'

var mongoose = require('mongoose');

var userSchemaDefinition = {
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

var schema = new mongoose.Schema(userSchemaDefinition);

module.exports = schema;
module.exports.model = mongoose.model('User', schema, 'users');
module.exports.definition = userSchemaDefinition;