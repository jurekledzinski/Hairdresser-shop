const express = require("express");
const router = express.Router();

const Visit = require("../models/visitCounter.model");
const isLoggedInAdmin = require("../middlewares/protectRoutes");

const { ErrorHandler } = require("../errors/error");

router.get("/", isLoggedInAdmin, (req, res, next) => {
  Visit.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.put("/", (req, res, next) => {
  Visit.find({})
    .then((data) => {
      if (data.length === 0) {
        const firstData = {
          counter: 1,
        };
        const newVisit = new Visit(firstData);
        newVisit
          .save()
          .then((response) => {
            return res.status(200).json(response);
          })
          .catch((err) => {
            next(new ErrorHandler(500, "Internal server error", err.message));
          });
      } else {
        Visit.findByIdAndUpdate(
          data[0]._id,
          { $inc: { counter: 1 } },
          { new: true }
        )
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((err) => {
            next(new ErrorHandler(500, "Internal server error", err.message));
          });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
