const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  opinion: {
    type: String,
    required: true,
  },
  rateStar: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
