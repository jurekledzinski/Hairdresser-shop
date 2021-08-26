const { roleAdmin, roleSuperAdmin } = require("../configs/config");

function isLoggedInAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    const userRole = req.user.role;

    if (userRole === roleAdmin || userRole === roleSuperAdmin) {
      return next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}

module.exports = isLoggedInAdmin;
