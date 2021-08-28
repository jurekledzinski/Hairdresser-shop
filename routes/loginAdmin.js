const express = require("express");
const router = express.Router();

const checkIsLoggedIn = require("../middlewares/protectRoutesCheckIsLog");
const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  getAdminData,
  logAdmin,
  logoutAdmin,
} = require("../controllers/loginAdminController");

router.get("/", getAdminData);

router.post("/", checkIsLoggedIn, logAdmin);

router.get("/logout", isLoggedInAdmin, logoutAdmin);

module.exports = router;
