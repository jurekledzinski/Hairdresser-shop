function checkIsLoggedIn(req, res, next) {
  let info = {
    alert: "You are already logged in",
  };

  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).json(info);
  }
}

module.exports = checkIsLoggedIn;
