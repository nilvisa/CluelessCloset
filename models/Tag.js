var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
	colors: [],
	pattern: [],
	season: [],
	occasion: [],
	custom: [],
	owner: String
});

module.exports = mongoose.model('Tag', TagSchema);