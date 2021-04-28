const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const RegisterAdmin = require("../models/registerAdmin.model.js");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      RegisterAdmin.findOne({ email: email }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    RegisterAdmin.findById(id, function (err, user) {
      const adminUser = {
        user: user.name,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl,
        userId: user._id,
        role: user.role,
        enableBook: user.enableBook,
        enableCancel: user.enableCancel,
        enableEmails: user.enableEmails,
        enableGallery: user.enableGallery,
        enableOpinions: user.enableOpinions,
        enableOpenShop: user.enableOpenShop,
        enableServices: user.enableServices,
        enablePermission: user.enablePermission,
      };
      done(err, adminUser);
    });
  });
};
