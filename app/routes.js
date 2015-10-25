var Item = require('./models/DBModel').Item;
var log = require('../lib/log').Log(module);
var User = require('./models/DBModel').User;

module.exports = function(app) {

	app.route('/api/items/')
		.get(function(req,res,next){
			Item.find(function(err,items){
				if(err) return next(err);
				res.json(items);
			});
		});

	app.route('/api/items/:item_id')
		.get(function(req,res,next){
			Item.findById(req.params.item_id,
				function(err,item){
					if(err) return next(err);
					res.json(item);
				});
		});
	app.route('/api/itemsfromcart')
		.post(function(req,res,next){
			log.info('BODY:' + req.body);
			Item.find({'_id':{ $in: req.body}},function(err,data){
				if(err) return next(err);
				res.json(data);
			})
			//res.json(tmp);
		});


	app.route('/api/cart')
		.get(function(req,res,next){
			User.findById('562ca68f9d46ab3a31816270',function(err,data){
				if (err) return(err);
				res.json(data.cart);
			});

		})
		.post(function(req,res,next){
			User.update({_id: '562ca68f9d46ab3a31816270'},{$addToSet: {cart: req.body}},function(err,data){
				if(err) return next(err);

			});
			User.update({_id: '562ca68f9d46ab3a31816270','cart.item_id': req.body.item_id}, {$inc: {'cart.$.count': 1}},function(err,data){
				if(err) return next(err);
			});

			User.findById('562ca68f9d46ab3a31816270',function(err,data){
				if(err) return next(err);
				log.info(JSON.stringify(data));
				res.json(data.cart);
			});
		});
	// application
	app.route('/clr')
		.get(function(req,res){
			User.findByIdAndUpdate('562ca68f9d46ab3a31816270',{$set :{cart: []}},function(err,data){
				res.json(data);
			});
	});
	app.use(function(err, req, res, next) {
		log.error(err);
		res.status(500).send('/404.html');
	});

	app.all('/*',function(req,res){
		res.sendFile(app.dirpath+'/index.html')
	});
};