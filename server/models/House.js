const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  size: {
    type: String,
  },
  house_no: {
    type: String,
  },
  floor_no: {
    type: String,
  },
  rent: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Vacant', 'Rented', 'On Notice']
  },
});

module.exports = mongoose.model('House', HouseSchema);