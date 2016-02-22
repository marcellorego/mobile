'use strict';

var ApiService  = rootRequire('youtube/services');
var util = rootRequire('util/index');

module.exports = function (router, route, wagner) {
    
    router.route(route)
    
    .get(wagner.invoke(function(Subscription, ObjectId) {
        return function(req, res, next) {
            
            var channelName = req.query.name || '';
            var pageToken = req.query.pageToken;
            
            ApiService.listChannels(channelName, pageToken, function(error, youtube) {
                if (!error) {
                    var query = { userId: new ObjectId('56a3f09352ba33a00c3cf4a6') };
                   
                    Subscription.model.find(query, {'channelId':true, '_id':false}, function (error, channels) {
                        
                        if (error) return util.handleError(res, error);
                        
                        mergeItems(youtube.items, channels);
                        
                        util.handleMany(res, next, error, youtube);         
                    });
                    
                } else {
                    util.handleError(res, error);
                }
            });
        }
    }))
}

function mergeItems(col1, col2) {
    
    var element1, element2;
    for(var pos1 in col1) {
        element1 = col1[pos1];
        element1.checked = false;
        for (var pos2 in col2) {
            element2 = col2[pos2];
            if (element2.channelId == element1.id.channelId) {
                element1.checked = true;
            }
        }
    }
}