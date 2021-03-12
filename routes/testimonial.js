const express = require("express");
const router = express.Router();

const Testimonial = require("../models/testimonial.model");

router.get("/", (req, res) => {
  Testimonial.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
