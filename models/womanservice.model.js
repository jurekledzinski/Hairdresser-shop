const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const womenServiceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("WomanService", womenServiceSchema);
