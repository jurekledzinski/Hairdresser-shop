const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const openShopSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OpenShop", openShopSchema);
