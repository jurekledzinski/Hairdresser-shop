const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const Email = require("../models/email.model");

router.get("/", (req, res) => {
  Email.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "to jest err Email");
    });
});

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const info = {
    alert: "",
    success: "",
  };

  if (!name || !email || !message) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  const output = `
  <p>You have new contact request</p>
  <h3>Contact details</h3>
  <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
  </ul>
  <h3>Message</h3>
  <p>${message}</p>
`;

  if (!Boolean(info.alert)) {
    const emailData = {
      name,
      email,
      message,
    };

    const newEmail = new Email(emailData);

    newEmail
      .save()
      .then()
      .catch((error) => {
        console.log(error);
      });

    let transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: "jurekledzinski@yahoo.pl",
        pass: "frvgvprofemnzqzg",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(
      {
        from: '"Message from client" <jurekledzinski@yahoo.pl>',
        to: "max23@o2.pl",
        subject: "Hair planet barber shop",
        text: "Hello world?",
        html: output,
      },
      (err, info) => {
        if (err) {
          return res.status(500).json("Oops, something went wrong try later");
        }

        info.success = "Email has been sent";
        info.name = name;
        info.email = email;
        info.message = message;
        return res.status(200).json(info);
      }
    );
  }
});

module.exports = router;
