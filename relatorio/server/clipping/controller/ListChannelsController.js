'use strict';

var ApiService  = rootRequire('youtube/services');
var util = rootRequire('util/index');

module.exports = function (router, route, wagner) {
    
    router.route(route)
    
    .get(function(req, res, next) {
        var channelName = req.query.name || '';
        var pageToken = req.query.pageToken;
        ApiService.listChannels(channelName, pageToken,
            util.handleMany.bind(null, res, next)
        );
    })
};