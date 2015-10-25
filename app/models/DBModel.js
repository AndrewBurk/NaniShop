var mongoose = require('mongoose');
var config   = require('../../config');
var __autoIndex = config.get('env') === 'dev';

var item = new mongoose.Schema({
	name: String,
	description: String,
	price : String,
	img : String
}, {
	autoIndex: __autoIndex
});

var user = new mongoose.Schema({
	cart: [{}]
} , {
	autoIndex: __autoIndex
});

exports.User = mongoose.model('User', user);
exports.Item = mongoose.model('Item', item);