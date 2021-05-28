const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const {
  emailOfUser,
  providerHost,
  portProviderEmail,
  passwordUserEmail,
} = require("../configs/config");

router.post("/:id", (req, res, next) => {
  const {
    cancelCode,
    dateAppointment,
    email,
    hairdresserName,
    name,
    services,
    totalPrice,
  } = req.body;

  const timeAppointment = new Date(dateAppointment).toUTCString();

  console.log(timeAppointment, " timeAppointment");

  console.log(new Date(timeAppointment), " czas zmieniony z utc");

  const output = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Demystifying Email Design</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  
      <style type="text/css">
          a[x-apple-data-detectors] {color: inherit !important;}
      </style>
  
  </head>
  <body style="margin: 0; padding: 0;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td style="padding: 20px 0 30px 0;">
  
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
      <tr>
          <td align="center" bgcolor="#393939" style="padding: 0px 0 0px 0;">
              <img src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Header%20email.jpeg?alt=media&token=e5074697-679a-4385-824f-146515dd6d3d" alt="Creating Email Magic." width="600" height="230" style="display: block;" />
          </td>
      </tr>
      <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                  <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                          <h1 style="font-size: 20px; margin: 0;">Thank you for order service in Hair planet :)</h1>
                      </td>
                  </tr>
                  <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 10px 0;">
                  <h3 style="font-size: 18px; margin: 0;">Your Order Details:</h3>
                          <p style="margin: 0;">Hairdresser name: ${hairdresserName}</p>
              <p style="margin: 0;">Date appointment: ${new Date(
                timeAppointment
              )
                .toLocaleDateString()
                .split("-")
                .reverse()
                .join(".")} ${new Date(dateAppointment)
    .toLocaleTimeString()
    .slice(0, 5)}</p>
              <p style="margin: 0;">Customer name: ${name}</p>
              <p style="margin: 0;">Services:</p>
              ${services.map(
                (item) =>
                  `<p style="margin: 0;"> ${item.title} ${item.price.toFixed(
                    2
                  )}€</p>`
              )}
              <p style="margin: 20px 0 0 0;">Total price with tax: <strong>${totalPrice.toFixed(
                2
              )}€</strong></p>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                              <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 10px 0;">
                  <h3 style="font-size: 18px; margin: 0;">Your cancel Code:</h3>
                  <p style="margin: 0;">Cancel code: ${cancelCode}</p>
                  <p style="margin: 0;">Please visit our website to check terms policy of our shop, before you cancel your order.</p>
                  <p style="margin: 0;">If you have any questions please contact with us by contact form on our page or directly by phone number which you can find there.</p>
                          </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              <tr>
                      <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                              <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                  <h3 style="font-size: 18px; margin: 0;">Cancel service:</h3>
                                  <p style="margin: 0;">If you would like to cancel service, you can do this below booking form on our page.</p>
                    <p style="margin: 0;">After cancel service you will recive confirmation email with all details.</p>
                    <p style="margin: 0;">We hope we can see you soon in our shop.</p>
                    <p style="margin: 0;">We wish you nice day.</p>
                    <p style="margin: 20px 0 0 0;">Hair planet team</p>
                          </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td bgcolor="#393939" style="padding: 30px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                  <tr>
                      <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                          <p style="margin: 0;">&reg; Hairplanet, All rights reserved &copy; ${new Date().getFullYear()}<br/></p>
                      </td>
                      <td align="right">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                              <tr>
                                  <td>
                                      <a href="http://www.twitter.com/">
                                          <img src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/twitter-icon.jpg?alt=media&token=11f42e10-8d95-4514-abf6-8c6677b6a3f4" alt="Twitter." width="38" height="38" style="display: block;" border="0" />
                                      </a>
                                  </td>
                                  <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                  <td>
                                      <a href="http://www.twitter.com/">
                                          <img src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/fb-icon.jpg?alt=media&token=e10661be-496f-48f3-bcf0-0f4a34ec02ba" alt="Facebook." width="38" height="38" style="display: block;" border="0" />
                                      </a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  
              </td>
          </tr>
      </table>
  </body>
  </html>
      `;

  let transporter = nodemailer.createTransport({
    host: providerHost,
    port: portProviderEmail,
    secure: true,
    auth: {
      user: emailOfUser,
      pass: passwordUserEmail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: `Booking confirmation Hair Planet Shop <${emailOfUser}>`,
      to: email,
      subject: "Booking confirmation Hair Planet Shop",
      html: output,
    },
    (err, info) => {
      if (err) {
        return res.status(500).json("Oops, something went wrong try later");
      }

      return res.end();
    }
  );
});

module.exports = router;
