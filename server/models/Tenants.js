const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  tel: {
    type: String,
  },
  id_no: {
    type: String,
  },
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
  },
  status: {
    type: String,
    default: 'Active',
  },
});

module.exports = mongoose.model('Tenant', TenantSchema);