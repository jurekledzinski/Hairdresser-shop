const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  deleteEmailById,
  getAllEmails,
  sendEmail,
} = require("../controllers/emailControl");

router.get("/", isLoggedInAdmin, getAllEmails);

router.post("/", sendEmail);

router.delete("/:id", isLoggedInAdmin, deleteEmailById);

module.exports = router;
