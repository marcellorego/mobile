'use strict';

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

module.exports = function (router, route, model) {

    var User = model;

    router.route(route)
    
    .get(function(req,res){
        var response = {};
        User.find({}, function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data", "code":err};
            } else {
                response = data;
            }
            res.json(response);
        });
    })
    
    .post(function(req,res){
        var user = new User();
        var response = {};
        // fetch email and name from REST request.
        // Add strict validation when you use this in Production.
        
        /*user.email = req.body.email;
        user.name = req.body.name;
        // Hash the password using SHA1 algorithm.
        user.password = cryptoPwd(req.body.password);*/
        
        util.copyBodyData(user, req.body, copyFunction);
        
        user.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data", "code":err};
            } else {
                response = {"name":user.name, "email":user.email};
            }
            res.json(response);
        });
    });
    
    
    router.route(route + "/:id")
    
    .get(function(req,res){
        var response = {};
        User.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data", "code":err};
            } else {
                response = data;
            }
            res.json(response);
        });
    })
    
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data", "code":err};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                /*if(req.body.name !== undefined) {
                    // case where email needs to be updated.
                    data.name = req.body.name;
                }
                if(req.body.email !== undefined) {
                    // case where email needs to be updated.
                    data.email = req.body.email;
                }
                if(req.body.password !== undefined) {
                    // case where password needs to be updated
                    // Hash the password using SHA1 algorithm.
                    data.password = cryptoPwd(req.body.password);
                }*/
                
                util.copyBodyData(data, req.body, copyFunction);
                
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data", "code":err};
                    } else {
                        response = data;
                    }
                    res.json(response);
                })
            }
        });
    })
    
    .delete(function(req,res){
        var response = {};
        // find the data
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data", "code":err};
            } else {
                // data exists, remove it.
                User.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data", "code":err};
                    } else {
                        response = data;
                    }
                    res.json(response);
                });
            }
        });
    })
};