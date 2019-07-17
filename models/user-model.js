const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    thumbnail: String,
    post: [String]
});

const User = mongoose.model('user', userSchema);

module.exports = User;