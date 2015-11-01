/**
 * Created by andrew on 28.10.15.
 */
var log       = require('../../lib/log').Log(module);
var HttpError = require('../../lib/error').HttpError;
var Item      = require('../models/DBModel').Item;

module.exports.ItemFromCart = function(req,res,next){
    Item.find({'_id':{ $in: req.body}},function(err,data){
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
        req.session.cart[req.body.item_id] = req.body.count;
        res.json(req.session.cart);
        return;
    }
    req.session.cart[req.body.item_id] = (req.session.cart[req.body.item_id]|| 0) + req.body.count;
    res.json(req.session.cart);
};
module.exports.GetItems = function(req,res,next){
    Item.find(function(err,items){
        if(err) return next(err);
        //req.session.user ='OK';
        res.json(items);
    });
};
module.exports.GetItemByID =function(req,res,next){
    Item.findById(req.params.item_id,
        function(err,item){
            if(err) return next(new HttpError(500,err.message));
            res.json(item);
        });
};


