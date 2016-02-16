'use strict';

var status = require('http-status');
var util = rootRequire('util/index');

module.exports = function (router, route, wagner) {

    var projection = {"_id":true,"channelId":true,"userId":true,"subscription_date":true};
    
    router.route(route)
    
    .get(wagner.invoke(function(Subscription) {
        return function(req, res, next) {
            var query = req.query || {};
            Subscription.model.find(query, projection, 
                util.handleMany.bind(null, res, next)
            );
        }
    }))
    
    /*.post(wagner.invoke(function(User) {
        return function(req,res,next) {
            var user = User.model();
            util.copyBodyData(user, req.body, copyFunction);
            user.save(function(error, data) {
                if (!error) {
                    delete data.password;
                }
                util.handleOne(res, next, error, data);
            });
        }
    }));

    router.route(route + "/:id")
    
    .get(wagner.invoke(function(User) {
        return function(req, res, next) {
            User.model.findById(req.params.id, projection,
                util.handleOne.bind(null, res, next)
            );
        }
    }))
    
    .put(wagner.invoke(function(User) {
        return function(req, res, next) {
            // first find out record exists or not
            // if it does then update the record
            User.model.findById(req.params.id, function(error, data) {
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
        }
    }))
    
    .delete(wagner.invoke(function(User) {
        return function(req, res, next) {
            // find the data
            User.model.findById(req.params.id, function(error, data) {
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
        }
    }))*/
};