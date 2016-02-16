'use strict';

var ApiService  = rootRequire('youtube/services');
var util = rootRequire('util/index');

module.exports = function (router, route, wagner) {
    
    router.route(route)
    
    .get(wagner.invoke(function(Subscription, ObjectId) {
        return function(req, res, next) {
            
            var channelName = req.query.name || '';
            var pageToken = req.query.pageToken;
            
            ApiService.listChannels(channelName, pageToken, function(error, results) {
                
                if (!error) {
                   
                    //var query = { userId: new ObjectId('56a3f09352ba33a00c3cf4a6') };
                   
                    Subscription.model.find({}, {'channelId':true, '_id':false}, 
                    function (err, Subs) {
                        
                        if (err) return util.handleError(res, err);
                        
                        var element, item;
                        for(var i in Subs) {
                            element = Subs[i];
                            for (var j in results.items) {
                                item = results.items[j];
                                if (item.id.channelId == element.channelId) {
                                    item.checked = true;
                                } else {
                                    item.checked = false;
                                }
                            }
                        }
                        
                        util.handleMany(res, next, error, results);         
                    });
                    
                } else {
                    util.handleError(res, error);
                }
            });
        }
    }))
};