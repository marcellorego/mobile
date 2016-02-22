'use strict';

var status = require('http-status');
var util = rootRequire('util/index');

module.exports = function (router, route, wagner) {

    var projection = {"_id":false,"channelId":true,"subscription_date":true};
    
    router.route(route)
    
    .get(wagner.invoke(function(Subscription, ObjectId) {
        return function(req, res, next) {
            var query = { userId: new ObjectId('56a3f09352ba33a00c3cf4a6') };
            Subscription.model.find(query, projection, 
                util.handleMany.bind(null, res, next)
            );
        }
    }))
    
    .post(wagner.invoke(function(Subscription, ObjectId) {
        return function(req,res,next) {
            var query = req.query || {};
            if (query.channelId) {
                if (query.checked == "true") {
                    var subs = Subscription.model();
                    subs.channelId = query.channelId;
                    subs.userId = new ObjectId('56a3f09352ba33a00c3cf4a6');
                    subs.save(function(error) {
                        var data = {
                             checked: true
                        };
                        util.handleOne(res, next, error, data);
                    });
                } else {
                    Subscription.model.remove({channelId : query.channelId}, function(error) {
                        var data = {
                             checked: false 
                        };
                        util.handleOne(res, next, error, data);
                    });
                }                
            }
        }
    }));

    /*router.route(route + "/:id")
    
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