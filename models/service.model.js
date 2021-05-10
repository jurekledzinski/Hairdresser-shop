const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  card: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
