const express = require("express");
const router = express.Router();

const Service = require("../models/service.model");

const { ErrorHandler } = require("../errors/error");

router.get("/:query", (req, res, next) => {
  const gender = req.query.qender;
  const card = req.query.card;

  Service.find({ gender: gender, card: card })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.post("/", (req, res, next) => {
  const { title, price, gender, card } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  if (!title || !price || !gender || !card) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    const currentService = {
      title,
      price,
      gender,
      card,
    };

    const newService = new Service(currentService);

    newService
      .save()
      .then((response) => {
        if (response) {
          info.success = "Service added successfully";
          info.service = response;
          return res.status(200).json(info);
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, price } = req.body;
  console.log(req.params);
  console.log(req.body);

  let info = {
    alert: "",
    success: "",
  };

  Service.findById(id)
    .then((response) => {
      if (response) {
        response.title = title;
        response.price = price;

        info.success = "Service updated succesfully";

        response.save().then((response) => {
          info.service = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  console.log(req.params, " delete service");

  const info = {
    alert: "",
    success: "",
  };

  Service.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Service removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
