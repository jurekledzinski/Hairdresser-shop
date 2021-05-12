const express = require("express");
const router = express.Router();

const Booking = require("../models/booking.model");
const ExcludedTime = require("../models/excludedTimes.model");

const { ErrorHandler } = require("../errors/error");

router.get("/booked", (req, res, next) => {
  console.log("pobiera booked");
  Booking.find({ isCancel: false })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.get("/canceled", (req, res, next) => {
  Booking.find({ isCancel: true })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

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

  //    Booking.findOne({ bookingId: idBooking }, userProjection)

  Booking.findOne(
    { $or: [{ bookingId: idBooking }, { cancelCode: idBooking }] },
    userProjection
  )
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
    bookTime,
    bookingWhere,
    cancelCode,
    cancelPaymentReturnPercent,
    cancelTime,
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
      bookTime,
      bookingWhere,
      cancelCode,
      cancelPaymentReturnPercent,
      cancelTime,
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
        .then((response) => {
          return res.end();
        })
        .catch((err) => {
          next(new ErrorHandler(500, "Internal server error", err.message));
        });
    }
  });
});

router.put("/cancel/code/:id", (req, res, next) => {
  let info = {
    alert: "",
    success: "",
  };

  const id = req.params.id;

  Booking.findOne({ cancelCode: id })
    .then((response) => {
      if (response) {
        let currentDate = new Date();
        response.isCancel = true;
        response.dataCancel = currentDate;
        response.cancelTime = currentDate;

        let dateBookingByUser = new Date(response.dataPayed);
        let dateTimesService = new Date(response.date);
        let daysBack = dateTimesService - 1000 * 60 * 60 * 24 * 3;
        let threeDaysBack = new Date(daysBack);

        console.log(
          currentDate < threeDaysBack && dateBookingByUser < threeDaysBack,
          "currentDate < threeDaysBack && dateBookingByUser < threeDaysBack"
        );

        console.log(currentDate > threeDaysBack, "currentDate > threeDaysBack");

        if (currentDate < threeDaysBack && dateBookingByUser < threeDaysBack) {
          response.cancelPaymentReturnPercent = "100%";
        } else if (currentDate > threeDaysBack) {
          response.cancelPaymentReturnPercent = "50%";
        }

        response.save().then((result) => {
          info.success = "Your order has been canceled successfully";
          info.cancelCode = result.cancelCode;
          return res.status(200).json(info);
        });

        console.log(dateTimesService, " dateTimesService");
        console.log(threeDaysBack, " threeDaysBack");
      } else {
        info.alert = "Incorrect cancel code";
        return res.status(404).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Booking.findOneAndDelete({ bookingId: id })
    .then((response) => {
      return res.status(200).end();
    })
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

router.delete("/booked/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params, " usuwa booked order");

  let info = {
    alert: "",
    success: "",
  };

  Booking.findOneAndDelete({ _id: id })
    .then((response) => {
      info.success = "Order removed successfully";
      return res.status(200).json(info);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/canceled/:id", (req, res) => {
  const id = req.params.id;

  let info = {
    alert: "",
    success: "",
  };
  Booking.findOneAndDelete({ _id: id })
    .then((response) => {
      info.success = "Order removed successfully";
      return res.status(200).json(info);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/excluded-code/:id", (req, res, next) => {
  const id = req.params.id;

  console.log("usuwa przez code cancel", id);

  ExcludedTime.findOneAndDelete({ codeCancel: id })
    .then((response) => {
      return res.status(200).end();
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/excluded/:id", (req, res, next) => {
  const id = req.params.id;

  console.log("usuwa nie code cancel");

  ExcludedTime.findOneAndDelete({ bookingId: id })
    .then((response) => {
      return res.status(200).end();
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
