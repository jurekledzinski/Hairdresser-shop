const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  addAdmin,
  deleteAdminById,
  getRegisterAdmin,
  updateAdminById,
  updateAdminProfileById,
} = require("../controllers/registerAdminControler");

router.get("/", isLoggedInAdmin, getRegisterAdmin);

router.post("/", addAdmin);

router.put("/:id", isLoggedInAdmin, updateAdminById);

router.put("/profile/:id", isLoggedInAdmin, updateAdminProfileById);

router.delete("/:id", isLoggedInAdmin, deleteAdminById);

module.exports = router;
