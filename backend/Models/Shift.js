const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  shifts: {
    type: Array,
  },
  userOwnderId:{
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
