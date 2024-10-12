const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    token: {type: String},
    role: {type: String, default: 'user'}
});

module.exports = model('User', userSchema);