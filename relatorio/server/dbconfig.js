'use strict'

module.exports = connectDB;

function connectDB(database, onOpen, onError) {
    
    console.log(database);
    
    var options = {
        db: { native_parser: true },
        server: { poolSize: 5 }
    };

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://' + database, options);

    var db = mongoose.connection;

    if (onError)
        db.on('error', onError);
    if (onOpen)
        db.once('open', onOpen);
    
    return db;
};