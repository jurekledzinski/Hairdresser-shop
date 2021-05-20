const express = require("express");
const router = express.Router();

const Team = require("../models/team.model");

const { ErrorHandler } = require("../errors/error");

router.get("/", (req, res, next) => {
  Team.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
