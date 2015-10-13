var mongoose = require('mongoose');

var OutfitSchema = new mongoose.Schema({
  items: [],
  tags: [],
  owner: String
});

module.exports = mongoose.model('Outfit', OutfitSchema);