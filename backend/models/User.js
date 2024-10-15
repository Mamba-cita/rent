const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true, required: true }, 
    password: { type: String, required: true }, 
    token: { type: String },
    role: { type: String, default: 'user' }
}, {
    timestamps: true 
});

module.exports = model('User', userSchema);
