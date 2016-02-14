'use strict'

module.exports = {
    '/users': {
        security: true,
        model: rootRequire('clipping/model/UserModel.js'),
        controller: rootRequire('clipping/controller/UserController')
    },
    
    '/listChannels': {
        controller: rootRequire('clipping/controller/ListChannelsController')
    }
};