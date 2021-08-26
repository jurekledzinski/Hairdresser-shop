const express = require("express");
const router = express.Router();
const passport = require("passport");

const { sessionName } = require("../configs/config");
const checkIsLoggedIn = require("../middlewares/protectRoutesCheckIsLog");
const isLoggedInAdmin = require("../middlewares/protectRoutes");

router.get("/", (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/", checkIsLoggedIn, (req, res, next) => {
  const { email, password } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  if (!email || !password) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    passport.authenticate("local", (err, user) => {
      if (err) {
        info.alert = "Something went wrong!";
        return res.status(500).json(info);
      }

      if (!user) {
        info.alert = "Incorrect email or password";
        return res.status(404).json(info);
      }

      req.logIn(user, function (err) {
        if (err) {
          info.alert = "Something went wrong!";
          return res.status(500).json(info);
        }

        info.success = "You are logged!";
        info.user = user.name;
        info.email = user.email;
        info.userId = user._id;
        info.role = user.role;
        info.enableBook = user.enableBook;
        info.enableCancel = user.enableCancel;
        info.enableEmails = user.enableEmails;
        info.enableGallery = user.enableGallery;
        info.enableOpinions = user.enableOpinions;
        info.enableOpenShop = user.enableOpenShop;
        info.enableServices = user.enableServices;
        info.enablePremissions = user.enablePremissions;

        return res.status(200).json(info);
      });
    })(req, res, next);
  }
});

router.get("/logout", isLoggedInAdmin, (req, res, next) => {
  const info = {
    alert: "",
    success: "",
  };

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        info.alert = "Something went wrong!";
        return res.status(500).json(info);
      }
      info.success = "You are log out";
      req.logout();
      res.clearCookie(sessionName);
      return res.status(200).json(info);
    });
  }
});

module.exports = router;
