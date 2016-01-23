'use strict'

module.exports = {
    '/users': {
        model: require('../model/UserModel.js'),
        controller: require('../controller/UserController')
    }
};