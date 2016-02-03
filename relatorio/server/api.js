var api    = require('./youtube/services');

api.listChannels('valor+economico', function(result) {
    console.log(result);
})