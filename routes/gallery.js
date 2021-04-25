const express = require("express");
const router = express.Router();

const Gallery = require("../models/gallery.model");

const { ErrorHandler } = require("../errors/error");

router.get("/:type", (req, res, next) => {
  const type = req.params.type;

  Gallery.find({ type: type })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.post("/", (req, res, next) => {
  const { title, imageUrl, type } = req.body;

  console.log(req.body);

  let info = {
    alert: "",
    success: "",
  };

  if (!title || !imageUrl || !type) {
    info.alert = "Please fill in all fields";
    return res.status(404).json(info);
  }

  if (!Boolean(info.alert)) {
    const dataGallery = {
      title,
      imageUrl,
      type,
    };

    const newGallery = new Gallery(dataGallery);

    newGallery
      .save()
      .then((response) => {
        info.success = "Image added successfully";
        info.image = response;
        if (response) {
          return res.status(200).json(info);
        }
      })
      .catch((err) => {
        next(new ErrorHandler(500, "Internal server error", err.message));
      });
  }
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, imageUrl, type } = req.body;

  let info = {
    alert: "",
    success: "",
  };

  Gallery.findById(id)
    .then((response) => {
      if (response) {
        response.title = title;
        response.imageUrl = imageUrl;
        response.type = type;

        info.success = "Image updated succesfully";

        response.save().then((response) => {
          info.imageUpdate = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  const info = {
    alert: "",
    success: "",
  };

  Gallery.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (response) {
        info.success = "Image removed successfully";
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

module.exports = router;
