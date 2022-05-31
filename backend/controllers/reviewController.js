const Review = require("../models/review.js");

exports.getAll = (req, res) => {
  Review.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};
