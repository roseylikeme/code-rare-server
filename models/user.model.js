const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, index: { unique: true} },
    //Our password is hashed with bcrypt
    password: { type: String, required: true },
    profile: {
        firstName: String,
        lastName: String,
        // avatar: String,
        bio: String,
    },
        
},{
    timestamps:true
});

const userModel = mongoose.model('Users', userSchema);
