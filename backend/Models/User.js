const mongoose = require("mongoose");

/**
 * Users collection will hold user ID number (9 digits)
 * password (hashed)
 * joinDate -> timestamp.
*/
const User = new mongoose.Schema(
  {
  userID: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});


module.exports = mongoose.model(`User`, User);
