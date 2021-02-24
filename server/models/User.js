const { binary } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    type: { type: Number, default: 0 },
    //USER_TYPES: 1 - Admin , 0 - Basic
    avatar: { data: Buffer, contentType: String },
    avatar_url: { type: String, deufalt: null },
    avatar_static: { type: String, default: 'woman' },
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;