const express = require("express");
const router = express.Router();

const Booking = require("../models/booking.model");
const ExcludedTime = require("../models/excludedTimes.model");

const isLoggedInAdmin = require("../middlewares/protectRoutes");

const { ErrorHandler } = require("../errors/error");

router.get("/booked", (req, res, next) => {
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

router.get("/amount-month/bookings/shop", (req, res, next) => {
  const monthsArray = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  Booking.aggregate([
    {
      $match: {
        $and: [
          { bookingWhere: "Shop", isCancel: false },
          {
            date: {
              $gte: new Date(new Date().getFullYear(), 0, 0),
              $lte: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        results: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [monthsArray, "$_id.month"],
            },
          ],
        },
      },
    },
  ])
    .then((response) => {
      let updateArr = monthsArray.reduce((acc, current) => {
        const temp = response.find((item) => item.month === current);
        if (!temp) {
          let b = {
            count: 0,
            month: current,
          };
          acc = [...acc, b];
        } else {
          return [...acc, temp];
        }

        return acc;
      }, []);

      updateArr.shift();

      return res.status(200).json(updateArr);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.get("/amount-month/bookings/website", (req, res, next) => {
  const monthsArray = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  Booking.aggregate([
    {
      $match: {
        $and: [
          { bookingWhere: "Website", isCancel: false },
          {
            date: {
              $gte: new Date(new Date().getFullYear(), 0, 0),
              $lte: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        results: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [monthsArray, "$_id.month"],
            },
          ],
        },
      },
    },
  ])
    .then((response) => {
      let updateArr = monthsArray.reduce((acc, current) => {
        const temp = response.find((item) => item.month === current);
        if (!temp) {
          let b = {
            count: 0,
            month: current,
          };
          acc = [...acc, b];
        } else {
          return [...acc, temp];
        }

        return acc;
      }, []);

      updateArr.shift();

      return res.status(200).json(updateArr);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.get("/payment-month/shop", (req, res, next) => {
  const monthsArray = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  Booking.aggregate([
    {
      $match: {
        $and: [
          { bookingWhere: "Shop", isCancel: false },
          {
            date: {
              $gte: new Date(new Date().getFullYear(), 0, 0),
              $lte: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          totalPayment: "$totalPrice",
        },
        results: { $push: "$$ROOT" },
        total: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [monthsArray, "$_id.month"],
            },
          ],
        },
      },
    },
  ])
    .then((response) => {
      const mergeArrShop = response.reduce((acc, { total, month }) => {
        const temp = acc.find((item) => item.month === month);

        if (!temp) {
          acc = [...acc, { total, month }];
        } else {
          temp.total += total;
        }
        return acc;
      }, []);

      let updateArr = monthsArray.reduce((acc, current) => {
        const temp = mergeArrShop.find((item) => item.month === current);
        if (!temp) {
          let b = {
            total: 0,
            month: current,
          };
          acc = [...acc, b];
        } else {
          return [...acc, temp];
        }

        return acc;
      }, []);

      updateArr.shift();

      return res.status(200).json(updateArr);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.get("/payment-month/website", (req, res, next) => {
  const monthsArray = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  Booking.aggregate([
    {
      $match: {
        $and: [
          { bookingWhere: "Website", isCancel: false },
          {
            date: {
              $gte: new Date(new Date().getFullYear(), 0, 0),
              $lte: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          totalPayment: "$totalPrice",
        },
        results: { $push: "$$ROOT" },
        total: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [monthsArray, "$_id.month"],
            },
          ],
        },
      },
    },
  ])
    .then((response) => {
      const mergeArrWebsite = response.reduce((acc, { total, month }) => {
        const temp = acc.find((item) => item.month === month);

        if (!temp) {
          acc = [...acc, { total, month }];
        } else {
          temp.total += total;
        }
        return acc;
      }, []);

      let updateArr = monthsArray.reduce((acc, current) => {
        const temp = mergeArrWebsite.find((item) => item.month === current);
        if (!temp) {
          let b = {
            total: 0,
            month: current,
          };
          acc = [...acc, b];
        } else {
          return [...acc, temp];
        }

        return acc;
      }, []);

      updateArr.shift();

      return res.status(200).json(updateArr);
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

        if (currentDate < threeDaysBack && dateBookingByUser < threeDaysBack) {
          response.cancelPaymentReturnPercent = "100%";
        } else if (currentDate > threeDaysBack) {
          response.cancelPaymentReturnPercent = "50%";
        }

        response.save().then((result) => {
          info.success = "Your order has been canceled successfully";
          info.cancelCode = result.cancelCode;
          info.dataOrder = result;
          return res.status(200).json(info);
        });
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

  ExcludedTime.findOneAndDelete({ bookingId: id })
    .then((response) => {
      return res.status(200).end();
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
