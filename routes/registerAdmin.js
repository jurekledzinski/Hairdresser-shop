const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const RegisterAdmin = require("../models/registerAdmin.model.js");
const isLoggedInAdmin = require("../middlewares/protectRoutes");

const { ErrorHandler } = require("../errors/error");

router.get("/", (req, res, next) => {
  RegisterAdmin.find({})
    .select("-password")
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
  const { name, lastName, email, password, confirmPassword, imageUrl } =
    req.body;

  const info = {
    alert: "",
    success: "",
  };

  if (!name || !lastName || !email || !password || !confirmPassword) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (password !== confirmPassword) {
    info.alert = "Both passwords have to be the same";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    RegisterAdmin.findOne({ email: email })
      .then((response) => {
        if (response) {
          if (response.email === email) {
            info.alert = "User email already exist";
            return res.status(401).json(info);
          }
        } else {
          RegisterAdmin.countDocuments()
            .then((count) => {
              let newRegistration = [];
              if (count < 1) {
                newRegistration.push({
                  name,
                  lastName,
                  email,
                  password,
                  imageUrl,
                  role: "Super Admin",
                  enableBook: true,
                  enableCancel: true,
                  enableEmails: true,
                  enableGallery: true,
                  enableOpinions: true,
                  enableOpenShop: true,
                  enableServices: true,
                  enablePermission: true,
                });
              } else if (count >= 1 && count < 3) {
                newRegistration.push({
                  name,
                  lastName,
                  email,
                  password,
                  imageUrl,
                  role: "Admin",
                  enableBook: false,
                  enableCancel: false,
                  enableEmails: false,
                  enableGallery: false,
                  enableOpinions: false,
                  enableOpenShop: false,
                  enableServices: false,
                  enablePermission: false,
                });
              } else {
                info.alert = "Only three admins can be registered";
                res.status(403).json(info);
              }

              const [newUser] = newRegistration;
              const newRegisteredPerson = new RegisterAdmin(newUser);

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newRegisteredPerson.password, salt, (err, hash) => {
                  if (err) throw err;
                  newRegisteredPerson.password = hash;

                  newRegisteredPerson
                    .save()
                    .then((data) => {
                      if (data) {
                        info.success = "You are registered";
                        return res.status(200).json(info);
                      }
                    })
                    .catch((err) => {
                      next(
                        new ErrorHandler(
                          500,
                          "Internal server error",
                          err.message
                        )
                      );
                    });
                });
              });
            })
            .catch((err) => {
              next(new ErrorHandler(500, "Internal server error", err.message));
            });
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const {
    enableBook,
    enableCancel,
    enableEmails,
    enableGallery,
    enableOpinions,
    enableOpenShop,
    enableServices,
    enablePermission,
  } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  RegisterAdmin.findById(id)
    .select("-password")
    .then((response) => {
      if (response) {
        response.enableBook = enableBook;
        response.enableCancel = enableCancel;
        response.enableEmails = enableEmails;
        response.enableGallery = enableGallery;
        response.enableOpinions = enableOpinions;
        response.enableOpenShop = enableOpenShop;
        response.enableServices = enableServices;
        response.enablePermission = enablePermission;

        info.success = "Permissions updated succesfully";

        response.save().then((response) => {
          info.permissions = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.put("/profile/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, lastName, email, password, confirmPassword, imageUrl } =
    req.body;

  let info = {
    alert: "",
    success: "",
  };

  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !imageUrl
  ) {
    info.alert = "Please fill in all fields";
    return res.status(401).json(info);
  }

  if (!Boolean(info.alert)) {
    RegisterAdmin.find(
      { $or: [{ email: email }, { name: name }] },
      (err, data) => {
        if (err) {
          info.alert = "Internal server error";
          return res.status(500).json(info);
        }

        let checkData = data.find((item) => item._id.toString() !== id);

        if (Boolean(checkData) && checkData._id.toString() !== id) {
          if (checkData.name === req.body.name) {
            info.alert = "User name already exist!";
            return res.status(401).json(info);
          } else {
            info.alert = "User email already exist!";
            return res.status(401).json(info);
          }
        } else {
          data[0].name = name;
          data[0].lastName = lastName;
          data[0].email = email;
          data[0].password = password;
          data[0].imageUrl = imageUrl;

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data[0].password, salt, (err, hash) => {
              if (err) throw err;
              data[0].password = hash;

              data[0]
                .save()
                .then((response) => {
                  let userObj = response.toObject();
                  delete userObj.password;

                  info.updateAdmin = userObj;
                  info.success = "Profile updated successfully";

                  return res.status(200).json(info);
                })
                .catch((err) => {
                  if (err) {
                    next(
                      new ErrorHandler(
                        500,
                        "Internal server error",
                        err.message
                      )
                    );
                  }
                });
            });
          });
        }
      }
    );
  }
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  const info = {
    alert: "",
    success: "",
  };

  RegisterAdmin.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Admin removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
