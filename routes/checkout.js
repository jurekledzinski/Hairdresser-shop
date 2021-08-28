const express = require("express");
const router = express.Router();

const { payInStripe } = require("../controllers/checkoutControl");

router.post("/", payInStripe);

module.exports = router;
