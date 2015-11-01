var controllers = require('./controllers'),
	checkAuth	= require('../../middleware/checkAuth');

module.exports = function(app) {

	app.route('/api/items')
		.get(controllers.GetItems);

	app.route('/api/items/:item_id')
		.get(controllers.GetItemByID);

	app.route('/api/itemsfromcart')
		.post(controllers.ItemFromCart);

	app.route('/api/cart')
		.get(controllers.GetCart)
		.post(controllers.ToCart);


	app.route('/clr')
		.get(checkAuth,function(req,res){
			res.send(JSON.stringify(req.isAuthenticated()));

	});

};
