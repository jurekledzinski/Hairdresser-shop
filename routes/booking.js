const express = require("express");
const router = express.Router();

const Booking = require("../models/booking.model");
const ExcludedTime = require("../models/excludedTimes.model");

const { ErrorHandler } = require("../errors/error");

router.get("/excluded", (req, res, next) => {
  ExcludedTime.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.get("/:id", (req, res, next) => {
  const idBooking = req.params.id;

  var userProjection = {
    phone: false,
    dataPayed: false,
  };

  Booking.findOne({ bookingId: idBooking }, userProjection)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.post("/", (req, res, next) => {
  let info = {
    alert: "",
    success: "",
  };

  const {
    agreePolicy,
    bookingId,
    cancelCode,
    dataCancel,
    dataPayed,
    date,
    email,
    hairdresserName,
    isCancel,
    isPayed,
    name,
    phone,
    services,
    totalPrice,
  } = req.body;

  if (
    !bookingId ||
    !cancelCode ||
    !dataPayed ||
    !date ||
    !email ||
    !hairdresserName ||
    !name ||
    !phone ||
    !services ||
    !totalPrice
  ) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    const createBooking = {
      agreePolicy,
      bookingId,
      cancelCode,
      dataCancel,
      dataPayed,
      date,
      email,
      hairdresserName,
      isCancel,
      isPayed,
      name,
      phone,
      services,
      totalPrice,
    };

    const newBooking = new Booking(createBooking);

    newBooking
      .save()
      .then((response) => {
        if (response) {
          return res.status(200).json(response);
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
});

router.post("/excluded", (req, res, next) => {
  const { codeCancel, isCancel, timeService, bookingId } = req.body;

  const createExTimes = {
    codeCancel,
    isCancel,
    timeService,
    bookingId,
  };

  const newExTimes = new ExcludedTime(createExTimes);

  newExTimes
    .save()
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { isPayed } = req.body;

  Booking.findById(id).then((response) => {
    if (response) {
      response.isPayed = isPayed;

      response
        .save()
        .then()
        .catch((err) => {
          next(new ErrorHandler(500, "Internal server error", err.message));
        });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Booking.findOneAndDelete({ bookingId: id })
    .then()
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/excluded/many", (req, res, next) => {
  ExcludedTime.deleteMany({ timeService: { $lt: new Date() } })
    .then((response) => {
      return res.status(200).end();
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/excluded/:id", (req, res, next) => {
  const id = req.params.id;

  ExcludedTime.findOneAndDelete({ bookingId: id })
    .then()
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
