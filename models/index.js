const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const opts = { timestamps: true };

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
    },
    userName: {
      type: String,
      required: true,
      minlength: 3,
      index: { unique: true },
    },
    bio: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  }, opts
)

userSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;

      next();
    });
  } );
});

const User = mongoose.model("User", userSchema);

module.exports = User;