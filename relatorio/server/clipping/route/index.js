'use strict'

module.exports = {
    '/users': {
        security: true,
        model: rootRequire('clipping/model/UserModel.js'),
        controller: rootRequire('clipping/controller/UserController')
    },
    
    '/subscriptions' : {
        security: true,
        model: rootRequire('clipping/model/SubscriptionModel.js'),
        controller: rootRequire('clipping/controller/SubscriptionController')
    },
    
    '/listChannels': {
        controller: rootRequire('clipping/controller/ListChannelsController')
    }
};