const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);
