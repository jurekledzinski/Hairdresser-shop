const express = require("express");
const router = express.Router();

const { sendEmailCancel } = require("../controllers/emailBookingCancelControl");

router.post("/", sendEmailCancel);

module.exports = router;
