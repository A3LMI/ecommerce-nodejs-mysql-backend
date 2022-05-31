const sql = require("../config/db.js");

const Review = function(Review) {
  this.testimonial = Review.testimonial;
  this.name = Review.name;
  this.rate = Review.rate;
  this.image = Review.image;
};

// get all reviews
Review.getAll = (result) => {
  let query = "SELECT * FROM review";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Review by ID
Review.getByID = (id, result) => {
  let query = "SELECT * FROM review WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create review
Review.create = (newReview, result) => {
    sql.query("INSERT INTO review SET ?", newReview, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Review created succesfully !", { ...newReview });
      result(null, { ...newReview });
    });
  };

// update Review
Review.update = (id, Review, result) => {
  sql.query(
    `UPDATE review
     SET testimonial=?, name=?, rate=?, image=?
     WHERE id=?`,
    [Review.testimonial, Review.name, Review.rate, Review.image, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Review with id " + id + " updated succesfully !", { id: id, ...Review });
      result(null, { id: id, ...Review });
    }
  );
};

// delete Review by id
Review.delete = (id, result) => {
  sql.query("DELETE FROM review WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Review with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Review;