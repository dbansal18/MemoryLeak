const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: String,
    userid: String,
    category: String,
    link: String,
    description: String
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;