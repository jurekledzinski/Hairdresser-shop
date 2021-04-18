const express = require("express");
const router = express.Router();
const passport = require("passport");

const { sessionName } = require("../configs/config");

router.get("/", (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/", (req, res, next) => {
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
        console.log(err);
      }

      if (!user) {
        info.alert = "Incorrect email or password";
        return res.status(404).json(info);
      }

      req.logIn(user, function (err) {
        if (err) {
          console.log(err);
        }

        info.success = "You are logged!";
        info.user = user.name;
        info.email = user.email;
        info.userId = user._id;
        info.role = user.role;

        return res.status(200).json(info);
      });
    })(req, res, next);
  }
});

router.get("/logout", (req, res) => {
  const info = {
    alert: "",
    success: "",
  };

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      info.success = "You are log out";
      req.logout();
      res.clearCookie(sessionName);
      return res.status(200).json(info);
    });
  }
});

module.exports = router;
