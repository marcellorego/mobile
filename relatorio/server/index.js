// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require("path");

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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// CONNECT TO THE DATABASE
var connectDB = require('./dbconfig');
var db = connectDB(app.locals.database, onDatabaseOpened, onDatabaseError);

// START THE SERVER
// =============================================================================
function onDatabaseOpened() {

	console.log('Listening on port ' + port);
	app.listen(port);
};

function onDatabaseError() {
    console.error.bind(console, 'connection error:')
};