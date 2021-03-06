const Carousel = require("../models/carousel.js");

exports.getAll = (req, res) => {
  Carousel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};