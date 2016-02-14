'use strict';

var status = require('http-status');

module.exports = function (router, route) {
    
    router.use(route, function (req, res, next) {
        console.log(req.method + ' = ' + req.originalUrl);
        next();
    });
}