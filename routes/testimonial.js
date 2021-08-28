const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  addTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getRandomTestimonials,
} = require("../controllers/testimonialControler");

router.get("/", getRandomTestimonials);

router.get("/all", isLoggedInAdmin, getAllTestimonials);

router.post("/", addTestimonial);

router.delete("/:id", isLoggedInAdmin, deleteTestimonialById);

module.exports = router;
