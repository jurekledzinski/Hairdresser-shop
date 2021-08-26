const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enableRegisterForm = new Schema({
  enableRegisterForm: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("EnableRegisterForm", enableRegisterForm);
