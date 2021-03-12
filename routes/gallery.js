const { response } = require("express");
const express = require("express");
const router = express.Router();

const Gallery = require("../models/gallery.model");

router.get("/", (req, res) => {
  Gallery.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
