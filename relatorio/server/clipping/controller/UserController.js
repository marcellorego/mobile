'use strict'

module.exports = function(router, route, model) {

    var Users = model;

    router.route(route)
    .get(function(req,res){
        var response = {};
        Users.find({}, function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data", "code":err};
            } else {
                response = data;
            }
            res.json(response);
        });
    });
};