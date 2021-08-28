const Testimonial = require("../models/testimonial.model");
const { ErrorHandler } = require("../errors/error");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const getRandomTestimonials = (req, res, next) => {
  Testimonial.find({})
    .then((response) => {
      let shuffleArr = shuffle(response);
      let ShuffleFour = shuffleArr.slice(0, 4);

      return res.status(200).json(ShuffleFour);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const getAllTestimonials = (req, res, next) => {
  Testimonial.find({})
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const addTestimonial = (req, res, next) => {
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
};

const deleteTestimonialById = (req, res, next) => {
  const id = req.params.id;

  const info = {
    alert: "",
    success: "",
  };

  Testimonial.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Opinion removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = {
  addTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getRandomTestimonials,
};
