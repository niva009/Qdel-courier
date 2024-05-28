const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  fromlat: { type: String, required: true },
  fromlon: { type: String, required: true },
  tolat: { type: String, required: true },
  tolon: { type: String, required: true },

});

module.exports = mongoose.model('location', LocationSchema);