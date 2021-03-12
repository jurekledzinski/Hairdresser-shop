const express = require("express");
const router = express.Router();

const MenService = require("../models/menservice.model");

router.get("/", (req, res, next) => {
  MenService.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "get menservices");
    });
});

module.exports = router;
// Course.find({})
// .then((response) => {
//   return res.status(200).json(response);
// })
// .catch((err) => {
//   if (err) {
//     next(new ErrorHandler(500, "Internal server error", err.message));
//   }
// });
