const Team = require("../models/team.model");
const { ErrorHandler } = require("../errors/error");

const getTeam = (req, res, next) => {
  Team.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = { getTeam };
