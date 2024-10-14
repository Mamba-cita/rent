const { model, Schema } = require('mongoose');

const roomSchema = new Schema({
  room_no: {
    type: String,
    required: true, // Adding a validation to ensure room number is provided
  },
  size: {
    type: Number,
    required: true, // Make sure room size is provided
  },
  rent: {
    type: Number,
    required: true, // Make sure rent is provided
  },
  floor: {
    type: Number,
    required: true, // Make sure floor number is provided
  },
  status: {
    type: String,
    enum: ['VACANT', 'OCCUPIED', 'ON-NOTICE'], // Room status options
    default: 'VACANT', // Set default status
  },
  houseId: {
    type: Schema.Types.ObjectId,
    ref: 'House', // Reference to the House model
    required: true,
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt`
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
