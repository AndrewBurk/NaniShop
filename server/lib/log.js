var ENV = process.env.NODE_ENV || 'dev';
var winston = require('winston');
winston.emitErrs = true;
// can be much more flexible than that O_o
/*function getLogger(module) {


  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV == 'dev') ? 'debug' : 'error',
        label: path
      })
    ]
  });
}*/

function getLogger(module) {
  if (module) var path = module.filename.split('/').slice(-2).join('/');
  return new winston.Logger({
  //var getLogger = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        label: path,
        filename: './logs/all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true
      }),
      new winston.transports.Console({
        level: 'info',
        label: path,
        handleExceptions: true,
        json: false,
        timestamp: true,
        colorize: true
      })
    ],
    exitOnError: false
  });
}


exports.Log = getLogger;
exports.stream = {
  write: function(message, encoding){
    getLogger.info(message);
  }
};