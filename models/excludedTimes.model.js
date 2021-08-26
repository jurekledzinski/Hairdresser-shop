const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excludedTimesSchema = new Schema({
  codeCancel: {
    type: String,
    required: true,
  },
  isCancel: {
    type: String,
    required: true,
  },
  timeService: {
    type: Date,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ExcludedTime", excludedTimesSchema);
