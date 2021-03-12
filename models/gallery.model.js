const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  menImages: {
    type: Array,
    required: true,
  },
  womenImages: {
    type: Array,
    required: true,
  },
  childrenImages: {
    type: Array,
    required: true,
  },
  weddingImages: {
    type: Array,
    required: true,
  },
  othersImages: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
