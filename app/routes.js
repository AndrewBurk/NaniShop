var Item = require('./models/item');
var log = require('../lib/log')(module);
var Carts = [];

module.exports = function(app) {

	app.get('/api/items',function(req,res){
		Item.find(function(err,items){
			if(err) res.send(err);
			res.json(items);
		});
		log.info(Carts.length);
	});

	app.post('/data/cart.json', function(req,res){
		Carts.push(req.body);
		log.info(Carts.length);
		res.json(Carts);
	})
	app.get('/data/cart', function(req,res){
		res.json(Carts);
	})
	// application
	/*app.get('/items/NexusS1', function(req,res){
		res.sendfile('./public/product-details.html');
	});*/

	app.get('/*', function(req, res) {
		Carts.length=0;
		res.sendfile('index.html', { root: __dirname });
	});
};