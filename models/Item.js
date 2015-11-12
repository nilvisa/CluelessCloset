var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  img: String,
  tags: [],
  types: [],
  missmatch: [],
  owner: String,
  created: String
});

module.exports = mongoose.model('Item', ItemSchema);