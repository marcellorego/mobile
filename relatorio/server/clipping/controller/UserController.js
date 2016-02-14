'use strict';

var status = require('http-status');
var util = rootRequire('util/index');

var cryptoPwd = function (password) {
  
    var crypto = require('crypto');
    var result = crypto
        .createHash('sha1')
        .update(password)
        .digest('base64');  
    return result;
};

var copyFunction = {
    'password' : cryptoPwd
};

module.exports = function (router, route, schema) {

    var User = schema.model;
    var projection = {"_id":true,"name":true,"email":true,"loggedInCount":true};
    
    router.route(route)
    
    .get(function(req, res, next) {
        var query = req.query || {};
        User.find(query, projection, 
            util.handleMany.bind(null, res, next)
        );
    })
    
    .post(function(req,res,next) {
        var user = User();
        util.copyBodyData(user, req.body, copyFunction);
        user.save(function(error, data) {
            if (!error) {
                delete data.password;
            }
            util.handleOne(res, next, error, data);
        });
    });

    router.route(route + "/:id")
    
    .get(function(req, res, next) {
        User.findById(req.params.id, projection,
            util.handleOne.bind(null, res, next)
        );
    })
    
    .put(function(req, res, next) {
        // first find out record exists or not
        // if it does then update the record
        User.findById(req.params.id, function(error, data) {
            if(error) {
                util.handleError(res, error);
            } else {
                util.copyBodyData(data, req.body, copyFunction);
                // save the data
                data.save(function(error, data) {
                    if (!error) {
                        delete data.password;
                    }
                    util.handleOne(res, next, error, data);
                })
            }
        });
    })
    
    .delete(function(req, res, next) {
        // find the data
        User.findById(req.params.id, function(error, data) {
            if(error) {
                util.handleError(res, error);
            } else {
                // data exists, remove it.
                User.model.remove({_id : req.params.id}, function(error) {
                    if (!error) {
                        data = {"_id" : req.params.id};
                    }
                    util.handleOne(res, next, error, data);
                });
            }
        });
    })
};