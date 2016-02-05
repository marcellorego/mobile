var api         = require('./youtube/services');
var ApiBuilder  = require('./youtube/APIBuilder');

api.listChannels('valor economico', null, function(result) {
    console.log(result);
});

/*api.channelById('UC48mLXk1ASg1EQbaS3MheWQ', function(result) {
    console.log(result);
});

api.listChannelVideos('UC48mLXk1ASg1EQbaS3MheWQ', 'petrobras', null, function(result) {
    console.log(result);
});*/

/*var builder  = new ApiBuilder();
var url = builder
    .host('aqui/')
    .action('carga')
    .part(['snippet','id'])
    .get();
    
console.log(url);*/