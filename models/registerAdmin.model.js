const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerAdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  enableBook: {
    type: Boolean,
    required: true,
  },
  enableCancel: {
    type: Boolean,
    required: true,
  },
  enableEmails: {
    type: Boolean,
    required: true,
  },
  enableGallery: {
    type: Boolean,
    required: true,
  },
  enableOpinions: {
    type: Boolean,
    required: true,
  },
  enableOpenShop: {
    type: Boolean,
    required: true,
  },
  enableServices: {
    type: Boolean,
    required: true,
  },
  enablePermission: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("RegisterAdmin", registerAdminSchema);
