const { response } = require("express");
const express = require("express");
const router = express.Router();

const WomanService = require("../models/womanservice.model");

router.get("/", (req, res) => {
  WomanService.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "Err podczas pobrania services women");
    });
});

module.exports = router;
