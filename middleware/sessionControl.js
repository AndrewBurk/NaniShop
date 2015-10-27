/**
 * Created by andrew on 27.10.15.
 */

var User = require('../app/models/DBModel').User;
var log  = require('../lib/log').Log(module);

module.exports = function(req, res, next) {
  if (req.session && req.session.id) {

      log.info('In if:'+req.session.id);
      res.locals.id = req.session.id;
      log.info('In if:'+res.locals.id);
      //res.session.cookie.test = 'testOK!';
    //User.findOne({_id: req.session.user_id}, function(err,user){
    //  log.info("in fi"+user);
    //  req.session.user_id = user._id;
    //  res.locals.user_id = user._id;
    //});
    //    //req.session.user_id = '562ca68f9d46ab3a31816270';  //refresh the session value*/
    //    //res.locals.user_id = '562ca68f9d46ab3a31816270';
    //
    //  // finishing processing the middleware and run the route
      next();
  } else {
      log.info('Out if:'+req.session.id);

 //user = new User({cart :[{
 //  item_id:'56235e879ecfc19374000001',
 //  count: 1
 //}]});
 //   log.info('Create user:'+user._id);
 //   user.save('OK');
 //   req.session.user_id=user._id;
 //   res.locals.user_id = user._id;
    next();
  }
};
