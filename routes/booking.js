const express = require("express");
const router = express.Router();

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const {
  createBooking,
  cancelBookingById,
  createExcludedTimes,
  deleteBookingById,
  deleteExludedTimesMany,
  getBookingById,
  getBookingInMonthShop,
  getBookingInMonthWebSite,
  getBookedCancelFalse,
  getBookedCancelTrue,
  getAllExcludedTimes,
  getPaymentMonthShop,
  getPaymentMonthWebsite,
  removeBookedById,
  removeCanceledById,
  removeExcluded,
  removeExcludedById,
  updateIsPayedOrderById,
} = require("../controllers/bookingControl");

router.get("/booked", isLoggedInAdmin, getBookedCancelFalse);

router.get("/canceled", isLoggedInAdmin, getBookedCancelTrue);

router.get("/excluded", getAllExcludedTimes);

router.get("/:id", getBookingById);

router.get(
  "/amount-month/bookings/shop",
  isLoggedInAdmin,
  getBookingInMonthShop
);

router.get(
  "/amount-month/bookings/website",
  isLoggedInAdmin,
  getBookingInMonthWebSite
);

router.get("/payment-month/shop", isLoggedInAdmin, getPaymentMonthShop);

router.get("/payment-month/website", isLoggedInAdmin, getPaymentMonthWebsite);

router.post("/", createBooking);

router.post("/excluded", createExcludedTimes);

router.put("/:id", updateIsPayedOrderById);

router.put("/cancel/code/:id", cancelBookingById);

router.delete("/:id", deleteBookingById);

router.delete("/excluded/many", deleteExludedTimesMany);

router.delete("/booked/:id", isLoggedInAdmin, removeBookedById);

router.delete("/canceled/:id", isLoggedInAdmin, removeCanceledById);

router.delete("/excluded-code/:id", removeExcludedById);

router.delete("/excluded/:id", removeExcluded);

module.exports = router;
