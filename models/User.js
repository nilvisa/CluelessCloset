var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	email: String, 
	types: [String],
 	tags: [String],
});

module.exports = mongoose.model('User', UserSchema);