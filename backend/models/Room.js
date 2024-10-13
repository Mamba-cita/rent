const { model, Schema } = require('mongoose');

const roomSchema = new Schema({
    room_no: { 
        type: String, 
        required: true, 
        unique: true // Ensure room numbers are unique
    },
    size: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['VACANT', 'RENTED', 'ON_NOTICE'], // Enum for room status
        default: 'VACANT' // Default status
    },
    houseId: { 
        type: Schema.Types.ObjectId, 
        ref: 'House', // Reference to the House model
        required: true 
    }
}, {
    timestamps: true
});

module.exports = model('Room', roomSchema);
