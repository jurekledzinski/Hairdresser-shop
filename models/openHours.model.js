const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const openHoursSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OpenHours", openHoursSchema);
