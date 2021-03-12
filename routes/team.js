const express = require("express");
const router = express.Router();

const Team = require("../models/team.model");

router.get("/", (req, res) => {
  Team.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "Err podczas pobierania team");
    });
});

module.exports = router;
