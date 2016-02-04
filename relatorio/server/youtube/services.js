'use strict'

var request = require('superagent');

var URL_ROOT = 'https://www.googleapis.com/youtube/v3/';
var KEY = 'AIzaSyCci79-Uk7M-hBXX8TFS8_y8e-8zpAiKlY';
var MAX_RESULTS = 5;

var SEARCH_API = 'search?part=snippet';
var CHANNEL_API = 'channels?part=snippet';

var REGION = '&regionCode=BR';
var CHANNELS_TYPE = '&type=channel';
var KEY_PARAM = '&key=';
var QUERY_PARAM = '&q=';
var ID_PARAM = '&id=';
var MAX_PARAM = '&maxResults=';
var PAGE_PARAM = '&pageToken=';
var CHANNELID_PARAM = '&channelId=';

module.exports = {
    listChannels: listChannels,
    channelById: channelById,
    listChannelVideos : listChannelVideos
};

function listChannels(q, page, callback) {
    
    var url = URL_ROOT + SEARCH_API + REGION + CHANNELS_TYPE + QUERY_PARAM + q + KEY_PARAM + KEY + MAX_PARAM + MAX_RESULTS;
    if (page) {
        url = url + PAGE_PARAM + page;    
    }

    requestUrl(url, callback);
};

function channelById(id, callback) {
    
    var url = URL_ROOT + CHANNEL_API + ID_PARAM + id + KEY_PARAM + KEY;
   
    requestUrl(url, callback);
};

function listChannelVideos(id, q, page, callback) {
    
    var url = URL_ROOT + SEARCH_API + CHANNELID_PARAM + id + QUERY_PARAM + q + KEY_PARAM + KEY + MAX_PARAM + MAX_RESULTS;
    if (page) {
        url = url + PAGE_PARAM + page;    
    }
    
    requestUrl(url, callback);
};

function requestUrl(url, callback) {
    
    console.log(url);
    
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