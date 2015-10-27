var Item      = require('./models/DBModel').Item;
var log       = require('../lib/log').Log(module);
var User 	  = require('./models/DBModel').User;
var HttpError = require('../lib/error').HttpError;

module.exports = function(app) {

	app.route('/api/items/')
		.get(function(req,res,next){
			//log.info('NOOOOO'+'562f544091b7c7d7f5000001');
			Item.find(function(err,items){
				if(err) return next(err);
				//req.session.user ='OK';
				res.json(items);
			});
		});

	app.route('/api/items/:item_id')
		.get(function(req,res,next){
			Item.findById(req.params.item_id+1,
				function(err,item){
					if(err) return next(new HttpError(500,err.message));
					res.json(item);
				});
		});
	app.route('/api/itemsfromcart')
		.post(function(req,res,next){
			Item.find({'_id':{ $in: req.body}},function(err,data){
				if(err) return next(err);
				res.json(data);
			})
			//res.json(tmp);
		});


	app.route('/api/cart')
		.get(function(req,res,next){
			//User.findById('562f544091b7c7d7f5000001',function(err,data){
			//	if (err) return next(err);
			//	if(!data){
			//		res.json({});
			//		return;
			//	}
			//	res.json(data.cart);
			//});
			res.json(req.session.cart);

		})


		.post(function(req,res,next){
			if(!req.session.cart){
				req.session.cart = {};
				req.session.cart[req.body.item_id] = req.body.count;
				res.json(req.session.cart);
				log.info(JSON.stringify(req.session.cart));
				return;
			}

			req.session.cart[req.body.item_id] = (req.session.cart[req.body.item_id] || 0) + req.body.count;
					//req.body.count;
				//log.info("Else: "+JSON.stringify(req.session.cart));
			res.json(req.session.cart);

			//User.findOne({_id: '562f544091b7c7d7f5000001','cart.item_id': req.body.item_id},function(err,data){
			//	if(err) return next(err);
			//	if(data){
			//		//if data exist inc count on req.body.count
			//		data.cart.forEach(function(item){
			//			if(item.item_id == req.body.item_id){
			//				item.count += req.body.count;
			//			}
			//		})
			//		data.markModified('cart');
			//		data.save();
			//		log.info('Inc count of item('+req.body.item_id+') in cart for SessionID: '+data._id);
			//		res.json(data.cart);
			//		return;
			//	}
			//	User.findByIdAndUpdate('562f544091b7c7d7f5000001',{$addToSet: {cart: req.body}},function(err,data){
			//		if(err) return next(err);
			//		log.info('Insert item('+req.body.item_id+') in cart for SessionID: '+data._id);
			//		res.json(data.cart);
			//		return;
			//	});
			//});
		});
	// application

	app.route('/clr')
		.get(function(req,res){
			User.findByIdAndUpdate('562f544091b7c7d7f5000001',{$set :{cart: []}},function(err,data){
				res.json(data);
			});
	});

	app.all('/*',function(req,res){
		res.sendFile(app.dirpath+'/index.html')
	});
};