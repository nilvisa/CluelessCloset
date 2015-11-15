var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
	tops: [],
	bottoms: [],
	shoes: [],
	accessories: [],
	owner: String
});

module.exports = mongoose.model('Type', TypeSchema);