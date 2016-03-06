/**
 * Created by andrew on 28.10.15.
 */
var //checkAuth   = require('../../middleware/checkAuth'),
    express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/DBModel').User,
    log         = require('../../lib/log').Log(module);

router.post('/register',function(req,res){
    User.register(new User({username: req.body.username, email: req.body.email}),req.body.password, function(err,account){
        log.info(req.body.email +'  ' +req.body.password);
        if (err){
            log.error(err);
            return res.json({err: err});
        }
        passport.authenticate('local')(req, res, function(){
           return res.json({status: 'Registration successful!'});
        });
    });
});

router.post('/login',function(req,res,next){
    passport.authenticate('local', function(err, user, info){
        if (err){
            log.error(err);
            return res.json({err: err});
        }
        if (!user){
            log.error(err);
            return res.json({err: err});
        }
        req.logIn(user, function(err){
            if (err) {
                return res.json({err: 'Could not log in user'});
            }
            //res.json({status: 'Login successful'});
            res.json({username: user.username,
                userrole: user.role});

        });
    })(req, res, next);
});

router.get('/logout',function(req,res){
    console.log('logouted');

    req.session.destroy();
    req.logout();
    res.json({status: 'Bye!'});
});

module.exports = router;

