'use strict'

var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

var Users = mongoose.model('users', UsersSchema);

module.exports = Users;