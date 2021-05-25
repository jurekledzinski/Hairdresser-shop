const express = require("express");
const router = express.Router();

const { stripeSecretKey } = require("../configs/config");
const stripe = require("stripe")(stripeSecretKey);

router.post("/", async (req, res) => {
  const domainURL = req.headers.host;
  console.log(domainURL, " DOMAIN URL");

  const { bookingId, services } = req.body;
  let updateForStripeArray = services.map((item) => {
    let priceWithTax = item.price + item.price * 0.19;
    let price = Math.round(priceWithTax * 100) / 100;

    return {
      name: item.title,
      currency: "eur",
      quantity: 1,
      amount: Math.round(price * 100),
      images: [item.imageUrl],
    };
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${domainURL}/booking/success/${bookingId}`,
    cancel_url: `${domainURL}/booking/cancel/${bookingId}`,
    payment_method_types: ["card"],
    line_items: updateForStripeArray,
    mode: "payment",
    client_reference_id: bookingId,
  });

  return res.status(200).json({ sessionId: session.id });
});

module.exports = router;
