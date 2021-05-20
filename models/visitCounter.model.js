const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  expiresAt: {
    type: Date,
    default: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      23,
      59,
      00
    ).getTime(),
  },
  counter: {
    type: Number,
    required: true,
  },
});

visitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model("Visit", visitSchema);
