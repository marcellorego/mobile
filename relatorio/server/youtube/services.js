'use strict'

var request = require('superagent');

var URL_ROOT = 'https://www.googleapis.com/youtube/v3/';
var KEY = 'AIzaSyCci79-Uk7M-hBXX8TFS8_y8e-8zpAiKlY&pageToken=CBkQAA';
var SEARCH_API = 'search?part=snippet';
var REGION = '&regionCode=BR';
var CHANNELS_TYPE = '&type=channel';
var KEY_PARAM = '&key=';

var MAX_RESULTS = 5;

module.exports = {
    listChannels: listChannels
};

function listChannels(q, callback) {
    
    var url = URL_ROOT + SEARCH_API + REGION + CHANNELS_TYPE + KEY_PARAM + KEY;
    
    request('GET', url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        var result = {};
        if (!err) {
            result = JSON.parse(res.text);
        }
        callback(result);
    });
};

