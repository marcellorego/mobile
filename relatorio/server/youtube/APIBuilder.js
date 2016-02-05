'use strict'

module.exports = function APIBuilder() {
    
    var self = this;
    
    var addParameter = function(param, value) {
        self.api += '&' + param + '=';
        if (typeof value === 'array') {
            value = value.join(',');
        }
        self.api += value;
        return self;
    }
    
    this.host = function(value) {
        self.api = value; 
        return self;
    }
    
    this.action = function(value) {
        self.api += value + '?';
        return self;
    }
    
    this.part = function(value) {
        return addParameter('part', value);
    }
    
    this.region = function(value) {
        return addParameter('regionCode', value);
    }
    
    this.type = function(value) {
        return addParameter('type', value);
    }
    
    this.query = function(value) {
        return addParameter('q', value);
    }
    
    this.key = function(value) {
        return addParameter('key', value);
    }
    
    this.maxResults = function(value) {
        return addParameter('maxResults', value);
    }
    
    this.pageToken = function(value) {
        return addParameter('pageToken', value);
    }
    
    this.id = function(value) {
        return addParameter('id', value);
    }
    
    this.channelId = function(value) {
        return addParameter('channelId', value);
    }
    
    this.get = function() {
        return self.api;
    }
}