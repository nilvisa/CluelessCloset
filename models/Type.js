var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
	top: [],
	bottom: [],
	shoes: [],
	accessories: [],
	owner: String
});

module.exports = mongoose.model('Type', TypeSchema);