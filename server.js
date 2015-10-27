// set up ======================================================================
var express        = require('express');
var path           = require('path');
var app            = express(); 								// create our app w/ express
var mongoose       = require('mongoose');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);

var config         = require('./config'); 			// load the database config
var log            = require('./lib/log').Log(module);
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


if (config.get('env') == 'dev') {
  app.use(require('morgan')(config.get('env'),"combined", { "stream": require('./lib/log').stream }));
  //app.use(logger('default'));
}

// configuration ===============================================================
mongoose.connect(config.get('db:uri'), config.get('db:options'),function(err, db){
  if (err){
    log.error(err.stack);
    throw err;
  }
  else log.info('Connected to the db - ' + config.get('db:uri'));
});

app.use(session({
  secret: config.get('session:secret'),
  maxAge: config.get('session:maxAge'),
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secure: true,
  "cookie":config.get('session:cookie')
}));
//(new Date(Date.now() + 172800000))

app.dirpath=path.join(__dirname + '/public');
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================

app.use(require('./middleware/sessionControl'));
//app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
app.use(require('./middleware/sendHttpError'));

app.use(express.static(path.join(__dirname + '/public')));
require('./app/routes.js')(app);

var HttpError = require('./lib/error').HttpError;

app.use(function(err, req, res, next) {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  }
  else {
    log.error(err);
    err = new HttpError(500);
    res.sendHttpError(err);
    res.send

  }
});

app.listen(config.get('port'),config.get('host'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
