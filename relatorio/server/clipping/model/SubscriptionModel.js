'use strict'

var mongoose = require('mongoose');

var definition = {
    channelId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subscription_date: { 
        type: Date, 
        default: Date.now
    }
};

var schemaName = 'Subscription';
var collectionName = 'subscriptions';
var schema = new mongoose.Schema(definition);
schema.index({ channelId: 1, userId: 1 }, { unique: true });

module.exports.schemaName = schemaName;
module.exports.collectionName = collectionName;
module.exports.definition = definition;
module.exports.schema = schema;
module.exports.model = mongoose.model(schemaName, schema, collectionName);