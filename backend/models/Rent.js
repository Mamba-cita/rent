const { model, Schema } = require('mongoose');

// Schema for Other Charges
const OtherChargesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

// Rent Schema
const rentSchema = new Schema({
    waterBill: { type: String, required: true },
    garbageCharge: { type: String, required: true },
    rent: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, // Reference to the Room model
    otherCharges: [OtherChargesSchema], // Array of other charges
    status: {
        type: String,
        enum: ['PAID', 'UNPAID', 'ARREARS'],
        default: 'UNPAID', // Default status
    },
}, {
    timestamps: true 
});

// Export the Rent model
module.exports = model('Rent', rentSchema);
