const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  addService,
  deleteServiceById,
  getServices,
  getServiceUseingQuery,
  updateServiceById,
} = require("../controllers/serviceControl");

router.get("/", getServices);

router.get("/:query", isLoggedInAdmin, getServiceUseingQuery);

router.post("/", isLoggedInAdmin, addService);

router.put("/:id", isLoggedInAdmin, updateServiceById);

router.delete("/:id", isLoggedInAdmin, deleteServiceById);

module.exports = router;
