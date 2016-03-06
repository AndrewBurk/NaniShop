/**
 * Created by andrew on 28.10.15.
 */
var log       = require('../../lib/log').Log(module);
var HttpError = require('../../lib/error').HttpError;
var Item      = require('../models/DBModel').Item;

module.exports.ItemFromCart = function(req,res,next){
    var keys = [];
    for(var key in req.session.cart){ keys.push(key);}

    Item.find({'_id':{ $in: keys}},function(err,data){
        if(err) return next(err);
        res.json(data);
    })

};
module.exports.GetCart = function(req,res,next){
    res.json(req.session.cart);
};
module.exports.ToCart = function(req,res,next){
    if(!req.session.cart){
        req.session.cart = {};
        req.session.cart[req.body.item_id] = (req.body.count || 1);
        res.json(req.session.cart);
        return;
    }
    req.session.cart[req.body.item_id] = (req.session.cart[req.body.item_id]|| 0) + req.body.count;
    if( req.session.cart[req.body.item_id] < 0) delete req.session.cart[req.body.item_id];
    //if( req.session.cart[req.body.item_id] < 0) req.session.cart[req.body.item_id] = 0;
    console.log('ToCart - item_id: '+ req.body.item_id +' count: ' + req.body.count + ' Sess Cart: ' + req.session.cart[req.body.item_id]);
    res.json(req.session.cart);
};
module.exports.GetItems = function(req,res,next){
    Item.find(function(err,items){
        if(err) return next(err);
        //req.session.user ='OK';
        res.json(items);
    });
};
module.exports.UpdateItem = function(req, res, next){
    Item.findOneAndUpdate({_id: req.body._id},req.body,{upsert:true},function(err,data){
        if (err) next(new HttpError(500,err.message));
        res.json('ok');
    });
};
module.exports.DeleteItem = function(req, res, next){
    Item.find({_id : req.body.item_id}).remove().exec();
};
module.exports.GetItemByID =function(req,res,next){
    Item.findById(req.params.item_id,
        function(err,item){
            if(err) return next(new HttpError(500,err.message));
            res.json(item);
        });
};


