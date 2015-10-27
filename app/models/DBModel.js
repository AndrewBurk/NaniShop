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
		session_id: 'String',
		cart: [{}],
		username: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		roles: [String]
}
	,{ autoIndex: __autoIndex });

exports.User = mongoose.model('User', user);
exports.Item = mongoose.model('Item', item);