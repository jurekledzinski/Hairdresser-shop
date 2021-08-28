const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  createImage,
  deleteImageById,
  getImages,
  updateImage,
} = require("../controllers/galleryControl");

router.get("/:type", getImages);

router.post("/", isLoggedInAdmin, createImage);

router.put("/:id", isLoggedInAdmin, updateImage);

router.delete("/:id", isLoggedInAdmin, deleteImageById);

module.exports = router;
