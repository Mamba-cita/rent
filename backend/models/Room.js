const { model, Schema } = require('mongoose');

const roomSchema = new Schema({
  room_no: {
    type: String,
    required: true, 
  },
  size: {
    type: Number,
    required: true, 
  },
  rent: {
    type: Number,
    required: true, 
  },
  floor: {
    type: Number,
    required: true, 
  },
  status: {
    type: String,
    enum: ['VACANT', 'RENTED', 'ON_NOTICE'], // Room status options
    default: 'VACANT', // Set default status
  },
  houseId: {
    type: Schema.Types.ObjectId,
    ref: 'House', 
    required: true,
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  }
}, {
  timestamps: true, 
});

// Virtual field to populate `house`
roomSchema.virtual('house', {
  ref: 'House',
  localField: 'houseId',
  foreignField: '_id',
  justOne: true, // Since only one house will be linked to a room
});

// Virtual field to populate `tenant`
roomSchema.virtual('tenant', {
  ref: 'User',
  localField: 'tenantId',
  foreignField: '_id',
  justOne: true, // Only one tenant is linked to a room
});

// Ensure virtuals are included in JSON and object output
roomSchema.set('toObject', { virtuals: true });
roomSchema.set('toJSON', { virtuals: true });

module.exports = model('Room', roomSchema);
