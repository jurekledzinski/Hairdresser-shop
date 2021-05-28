const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
require("./configs/passport")(passport);

const port = process.env.PORT || 5000;

const {
  atlasUrl,
  nodeEnv,
  sessionName,
  secretSession,
} = require("./configs/config");

mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

let errDb = false;
let openDb = true;

db.on("error", (err) => {
  errDb;
});
db.once("open", () => {
  openDb;
});

const serviceRouter = require("./routes/service");
const teamRouter = require("./routes/team");
const galleryRouter = require("./routes/gallery");
const testimonialRouter = require("./routes/testimonial");
const openHoursRouter = require("./routes/openhours");
const emailRouter = require("./routes/email");
const registerAdmin = require("./routes/registerAdmin");
const loginAdmin = require("./routes/loginAdmin");
const enableRegisterFormRouter = require("./routes/enableRegisterForm");
const bookingRouter = require("./routes/booking");
const checkoutRouter = require("./routes/checkout");
const emailConfirmation = require("./routes/emailBookingConfirmation");
const emailBookingCancel = require("./routes/emailBookingCancel");
const counterVisits = require("./routes/counterVisits");

const app = express();

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

app.use(
  cors({
    credentials: true,
    origin: "https://intense-caverns-83490.herokuapp.com",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);

app.use(
  session({
    name: sessionName,
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: nodeEnv === "production" ? "lax" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' firebasestorage.googleapis.com *.firebasestorage.googleapis.com mongodb.com *.mongodb.com stripe.com *.stripe.com maps.googleapis.com; img-src * 'self' data: https:;font-src *; object-src 'self';script-src 'self' maps.googleapis.com stripe.com *.stripe.com;style-src 'self' 'unsafe-inline' fontawesome.com *.fontawesome.com fonts.google.com *.fonts.google.com fonts.googleapis.com *.fonts.googleapis.com;"
  );
  next();
});

app.use("/visits", counterVisits);
app.use("/service", serviceRouter);
app.use("/team", teamRouter);
app.use("/gallery", galleryRouter);
app.use("/opinions", testimonialRouter);
app.use("/open-shop", openHoursRouter);
app.use("/email", emailRouter);
app.use("/register-admin", registerAdmin);
app.use("/login-admin", loginAdmin);
app.use("/enable-register", enableRegisterFormRouter);
app.use("/booking", bookingRouter);
app.use("/create-checkout-session", checkoutRouter);
app.use("/email-confirmation", emailConfirmation);
app.use("/email-booking-cancel", emailBookingCancel);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    let pathUrl = req.path.replace(/^\//, "").replace(/\/$/, "");

    if (pathUrl && pathUrl.endsWith(".js")) {
      const options = { headers: { "content-type": "application/javascript" } };
      let index = pathUrl.lastIndexOf("/");
      let nameOfFile = pathUrl.slice(index + 1);
      res.sendFile(
        path.join(__dirname, "client", "build", nameOfFile),
        options
      );
    } else if (pathUrl && pathUrl.endsWith(".css")) {
      const options = { headers: { "content-type": "text/css" } };
      let index = pathUrl.lastIndexOf("/");
      let nameOfFile = pathUrl.slice(index + 1);
      res.sendFile(
        path.join(__dirname, "client", "build", nameOfFile),
        options
      );
    } else {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    }
  });
}

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    where: error.message,
    statusCode: error.status,
    alert: error.msgError,
  });
});

app.listen(port);

module.exports = app;
