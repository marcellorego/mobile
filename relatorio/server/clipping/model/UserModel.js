'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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
});

var User = mongoose.model('User', UserSchema, 'users');

module.exports = User;