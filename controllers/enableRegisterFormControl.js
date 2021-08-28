const EnableRegisterForm = require("../models/enableRegisterForm.model");

const { ErrorHandler } = require("../errors/error");

const getEnableRegister = (req, res) => {
  EnableRegisterForm.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const updateEnableRegister = (req, res) => {
  const { enableRegisterForm } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  EnableRegisterForm.findOne()
    .then((response) => {
      if (response) {
        response.enableRegisterForm = enableRegisterForm;

        info.success = enableRegisterForm ? "Enable Register" : "Enable login";

        response.save().then((response) => {
          return res.status(200).json(info);
        });
      } else {
        let enableEndpoint = {
          enableRegisterForm,
        };

        const newEnable = new EnableRegisterForm(enableEndpoint);

        newEnable
          .save()
          .then((response) => {
            if (response) {
              res.status(200).end();
            }
          })
          .catch((err) => {
            next(new ErrorHandler(500, "Internal server error", err.message));
          });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = { getEnableRegister, updateEnableRegister };
