const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  addOpenHour,
  deleteOpenHourById,
  getOpenHours,
  updateOpenHour,
} = require("../controllers/openHoursControler");

router.get("/", getOpenHours);

router.post("/", isLoggedInAdmin, addOpenHour);

router.put("/:id", isLoggedInAdmin, updateOpenHour);

router.delete("/:id", isLoggedInAdmin, deleteOpenHourById);

module.exports = router;
