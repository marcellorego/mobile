'use strict'

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require("path");
var _ = require('lodash');
var wagner = require('wagner-core');

var app = express();                 // define our app using express

//Load package.json
var pjson = require(path.join(__dirname, '/package.json'));

// Properties for the application
app.locals.database = pjson.database;
app.locals.version = pjson.version;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app
.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /clipping
app.use('/clipping', router);

// CONNECT TO THE DATABASE
var connectDB = require('./dbconfig');
var db = connectDB(app.locals.database, onDatabaseOpened, onDatabaseError);

// START THE SERVER
// =============================================================================
function onDatabaseOpened() {

    loadServices();

	console.log('Listening on port ' + port);
	app.listen(port);
};

function onDatabaseError() {
    console.error.bind(console, 'connection error:')
};

function loadServices() {
    console.log('Loading services...');
    
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Start Time: ', Date.now());
        next();
    });
    
    var secutiry = rootRequire('clipping/controller/SecurityController');
    
    //Load the routes
    var routes = rootRequire('clipping/route/index');
    _.each(routes, function(config, route) {
        
        if (config.model) {
            wagner.factory(config.model.schemaName, function() {
                return config.model;
            });
        }
        
        if (config.security) {
            secutiry(router, route);
        }
        
        config.controller(router, route, wagner);
    });
    
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('End Time: ', Date.now());
        next();
    });
    
    console.log('Services loaded.');
}