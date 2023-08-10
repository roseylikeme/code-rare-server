const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
    },
    fullname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('User', userSchema);