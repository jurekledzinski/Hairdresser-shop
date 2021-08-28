const nodemailer = require("nodemailer");
const Email = require("../models/email.model");
const { ErrorHandler } = require("../errors/error");

const {
  emailAddressSendTo,
  emailOfUser,
  providerHost,
  portProviderEmail,
  passwordUserEmail,
} = require("../configs/config");

const getAllEmails = (req, res, next) => {
  Email.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const sendEmail = (req, res, next) => {
  const { name, email, message } = req.body;

  const info = {
    alert: "",
    success: "",
  };

  if (!name || !email || !message) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  const output = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Cancel booking Hair planet</title>
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
                            <h1 style="font-size: 20px; margin: 0;">Contact email</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 10px 0;">
                            <h3 style="font-size: 18px; margin: 0;">Contact details:</h3>
                            <p style="margin: 0;">${name}</p>
                            <p style="margin: 0;">${email}</p>
                        </td>
                    </tr>
                    <tr>
                </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                <tr>
                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                                <h3 style="font-size: 18px; margin: 0;">Message:</h3>
                                <p style="margin: 0;">${message}</p>
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
    </html>`;

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
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });

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
        from: `"Message from client" <${emailOfUser}>`,
        to: emailAddressSendTo,
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
};

const deleteEmailById = (req, res, next) => {
  const id = req.params.id;

  const info = {
    alert: "",
    success: "",
  };
  Email.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Email removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = { deleteEmailById, getAllEmails, sendEmail };
