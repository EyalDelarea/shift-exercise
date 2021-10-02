const mongoose = require("mongoose");

/**
 * This Collction will hold for every user, his shifts data.
 * Array of shifts objects 
 * userOwner ID
 * Created at timestamp
 */
const shiftSchema = new mongoose.Schema({
  shifts: {
    type: Array,
  },
  userOwnerID:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

module.exports = mongoose.model("Shifts", shiftSchema);
