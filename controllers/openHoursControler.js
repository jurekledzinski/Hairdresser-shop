const OpenShop = require("../models/openHours.model");
const { ErrorHandler } = require("../errors/error");

const getOpenHours = (req, res, next) => {
  OpenShop.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const addOpenHour = (req, res, next) => {
  const { day, time } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  if (!day || !time) {
    info.alert = "Please fill in all fields";
    return res.status(200).json(info);
  }

  if (!Boolean(info.alert)) {
    const newDayTime = {
      day,
      time,
    };

    const newOpenShop = new OpenShop(newDayTime);

    newOpenShop
      .save()
      .then((response) => {
        if (response) {
          info.openshop = response;
          info.success = "Open hours added successfully";
          return res.status(200).json(info);
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
};

const updateOpenHour = (req, res, next) => {
  const id = req.params.id;
  const { day, time } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  OpenShop.findById(id)
    .then((response) => {
      if (response) {
        response.day = day;
        response.time = time;

        info.success = "Open hours updated succesfully";

        response.save().then((response) => {
          info.openshop = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const deleteOpenHourById = (req, res, next) => {
  const id = req.params.id;

  let info = {
    alert: "",
    success: "",
  };

  OpenShop.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Open hours removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = {
  addOpenHour,
  deleteOpenHourById,
  getOpenHours,
  updateOpenHour,
};
