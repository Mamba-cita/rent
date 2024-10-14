const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema(
  {
    roomId: {
      type: String, 
      required: true,
    },
    rent: {
      type: Number,
      required: true,
      min: 0, 
    },
    waterBill: {
      type: Number,
      required: true,
      min: 0, 
    },
    garbageCharge: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Bill', BillSchema);
