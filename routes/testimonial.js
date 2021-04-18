const express = require("express");
const router = express.Router();

const Testimonial = require("../models/testimonial.model");
const { ErrorHandler } = require("../errors/error");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

router.get("/", (req, res, next) => {
  Testimonial.find({})
    .then((response) => {
      let shuffleArr = shuffle(response);
      let ShuffleFour = shuffleArr.slice(0, 4);

      return res.status(200).json(ShuffleFour);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.post("/", (req, res, next) => {
  const { name, imageUrl, opinion, rateStar } = req.body;

  const info = {
    alert: "",
    success: "",
  };

  if (!name || !imageUrl || !opinion || !rateStar) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    const dataForm = {
      name,
      imageUrl,
      opinion,
      rateStar,
    };

    const newOpinion = new Testimonial(dataForm);

    newOpinion
      .save()
      .then((response) => {
        if (response) {
          info.success = "Thank you for your opinion";
          return res.status(200).json(info);
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
});

module.exports = router;
