const express = require("express");
const router = express.Router();

const {
  sendEmailConfirmation,
} = require("../controllers/emailBookingConfirmationControl");

router.post("/:id", sendEmailConfirmation);

module.exports = router;
