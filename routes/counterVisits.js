const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  getAmountVisits,
  updateCountVisits,
} = require("../controllers/counterVisitsControl");

router.get("/", isLoggedInAdmin, getAmountVisits);

router.put("/", updateCountVisits);

module.exports = router;
