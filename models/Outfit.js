var mongoose = require('mongoose');

var OutfitSchema = new mongoose.Schema({
  items: [],
  tags: [],
  owner: String,
  created: String
});

module.exports = mongoose.model('Outfit', OutfitSchema);