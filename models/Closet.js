var mongoose = require('mongoose');

var ClosetSchema = new mongoose.Schema({
  name: String,
  owner: String
});

module.exports = mongoose.model('Closet', ClosetSchema);