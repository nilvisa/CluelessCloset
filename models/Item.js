var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  img: String,
  tags: [],
  types: [],
  missmatch: [],
  closet: [],
  owner: String
});

module.exports = mongoose.model('Item', ItemSchema);