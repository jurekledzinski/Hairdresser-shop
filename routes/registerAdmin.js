const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const RegisterAdmin = require("../models/registerAdmin.model.js");

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    confirmPassword,
    imageUrl,
  } = req.body;

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
                  role: "Admin",
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
                      console.log(err);
                    });
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  console.log(req.params, " register update");
});

module.exports = router;

// const newRegisterAdmin = new RegisterAdmin(dataAdmin);

// newRegisterAdmin.save().then(response);
