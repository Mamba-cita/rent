const { model, Schema } = require('mongoose');

const houseSchema = new Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    name: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('House', houseSchema);
