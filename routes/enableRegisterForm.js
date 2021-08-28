const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  getEnableRegister,
  updateEnableRegister,
} = require("../controllers/enableRegisterFormControl");

router.get("/", getEnableRegister);

router.put("/", isLoggedInAdmin, updateEnableRegister);

module.exports = router;
