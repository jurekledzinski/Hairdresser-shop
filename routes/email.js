const express = require("express");
const router = express.Router();

const Email = require("../models/openHours.model");

router.get("/", (req, res) => {
  Email.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "to jest err Email");
    });
});

module.exports = router;
