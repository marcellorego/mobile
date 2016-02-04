'use strict'

module.exports = function APIBuilder() {
    
    var self = this;
    
    this.host = function(value) {
        self.api = value; 
        return self;
    }
    
    this.action = function(value) {
        self.api += value + '?';
        return self;
    }
    
    this.part = function(value) {
        self.api += '&part=';
        if (typeof value === 'array') {
            value = value.join(',');
        }
        self.api += value;
        return self;
    }
    
    this.region = function(value) {
        self.api += '&regionCode=' + value; 
        return self;
    }
    
    this.region = function(value) {
        self.api += '&regionCode=' + value; 
        return self;
    }
    
    this.get = function() {
        return self.api;
    }
}