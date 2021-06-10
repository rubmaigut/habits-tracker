const mongoose = require('mongoose')
const crypto = require('crypto')

/***** SET SCHEMA   ******/

//Email validator
const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

// Create new users model
  const User = mongoose.model("Users", {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex"),
    },
    googleId: {
      type: String,
      unique: true,
    }
  });
  /*****  END SET SCHEMA   ******/
  module.exports = User;