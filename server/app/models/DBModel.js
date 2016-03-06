var mongoose = require('mongoose');
var config   = require('../../config');
var passportLocalMongoose = require('passport-local-mongoose');

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
		username: String,
		password: String,
		email: String,
		role: {
			type: String,
			default: 'user'
		}
}
	,{ autoIndex: __autoIndex });

user.plugin(passportLocalMongoose);

exports.User = mongoose.model('User', user);
exports.Item = mongoose.model('Item', item);