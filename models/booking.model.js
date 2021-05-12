const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  agreePolicy: {
    type: Boolean,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  bookTime: {
    type: Date,
    required: true,
  },
  bookingWhere: {
    type: String,
    required: true,
  },
  cancelCode: {
    type: String,
    required: true,
  },
  cancelPaymentReturnPercent: {
    type: String,
    required: false,
  },
  cancelTime: {
    type: Date,
    required: false,
  },
  dataCancel: {
    type: Date,
    required: false,
  },
  dataPayed: {
    type: Date,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hairdresserName: {
    type: String,
    required: true,
  },
  isCancel: {
    type: Boolean,
    required: true,
  },
  isPayed: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
