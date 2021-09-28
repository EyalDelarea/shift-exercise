const mongoose = require("mongoose");


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
