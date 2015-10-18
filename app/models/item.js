var mongoose = require('mongoose');

module.exports = mongoose.model('Item', {
	name : {type : String, default: ''},
	description : {type : String, default: ''},
	price : {type : String, default: ''},
	img : {type : String, default: ''}
});