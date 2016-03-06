/**
 * Created by andrew on 01.11.15.
 */
var express     = require('express'),
    router      = express.Router(),
    checkAuth   = require('../../../server/middleware/checkAuth')

router.get('/1',checkAuth,function(req,res){
    res.send('sfdsdf');
});

//router.get('/',function(req,res){
//    res.send('/admin/index1.html');
//});

module.exports = router;