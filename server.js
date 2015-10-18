// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var config = require('./config'); 			// load the database config
var log   = require('./lib/log')(module);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


if (app.get('env') == 'development') {
  app.use(express.logger('dev'));
} else {
  app.use(express.logger('default'));
}

// configuration ===============================================================
mongoose.connect(config.get('db:uri'), config.get('db:options')); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/css',express.static(__dirname + '/public/data'));
app.use('/css',express.static(__dirname + '/public/images'));
app.use('/css',express.static(__dirname + '/public/font'));

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

app.listen(config.get('port'),config.get('host'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
