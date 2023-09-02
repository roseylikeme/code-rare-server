const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const opts = { timestamps: true };

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 1
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    bio: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, opts);

userSchema.pre('save', function(next){
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, salt, function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    })
})

const User = mongoose.model('Users', userSchema);

module.exports = User;