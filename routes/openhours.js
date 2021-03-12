const express = require("express");
const router = express.Router();

const OpenHours = require("../models/openHours.model");

router.get("/", (req, res) => {
  OpenHours.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "to jest err open hours");
    });
});

module.exports = router;
