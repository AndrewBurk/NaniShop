// set up ======================================================================
var express        = require('express'),
    path           = require('path'),
    app            = express(),
    mongoose       = require('mongoose'),
    session        = require('express-session'),
    MongoStore     = require('connect-mongo')(session),
    config         = require('./server/config'),
    log            = require('./server/lib/log').Log(module),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    passport       = require('passport'),
    localStrategy  = require('passport-local').Strategy,
    checkAuth      = require('./server/middleware/checkAuth');

if (config.get('env') == 'dev') {
  app.use(require('morgan')(config.get('env'),"combined", { "stream": require('./server/lib/log').stream }));
}

// configuration ===============================================================

mongoose.connect(config.get('db:uri'), config.get('db:options'),function(err, db){
  if (err){
    log.error(err.stack);
    throw err;
  }
  else log.info('Connected to the db - ' + config.get('db:uri'));
});

app.dirpath=path.join(__dirname + '/client/public');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
app.use(require('./server/middleware/SendHttpError'));
app.use(session({
  secret: config.get('session:secret'),
  maxAge: config.get('session:maxAge'),
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secure: true,
  "cookie":config.get('session:cookie')
}));
//(new Date(Date.now() + 172800000))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname + '/client/public')));
var User = require('./server/app/models/DBModel').User;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes ======================================================================

require('./server/app/routes/main')(app);

app.use('/user',require('./server/app/routes/UserAuth'));
app.get('/adminP',require('./server/app/routes/admin'));
//app.get('/admin/*',checkAuth,function(req,res){
//  res.sendFile(app.dirpath+'/admin/index.html')
//});

app.get('/*',function(req,res){
  res.sendFile(app.dirpath+'/partials/index.html')
});

var HttpError = require('./server/lib/error').HttpError;

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
  }
});

app.listen(config.get('port'),config.get('host'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
