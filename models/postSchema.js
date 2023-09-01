//bring in mongoose so we can create a schema that represents the data for a Post
const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true}, id: false, timestamps: { createdAt: true, updatedAt: false } };
const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    username: {
        type: String,
        required: true,
        minlength: 3
    },
}, opts)

postSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId'
});

const Post = mongoose.model('Post', postSchema);

//export our model
module.exports = Post;