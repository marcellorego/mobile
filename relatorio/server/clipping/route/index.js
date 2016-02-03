'use strict'

module.exports = {
    '/users': {
        model: rootRequire('clipping/model/UserModel.js'),
        controller: rootRequire('clipping/controller/UserController')
    }
};