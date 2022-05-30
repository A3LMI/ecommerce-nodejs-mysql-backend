const sql = require("../config/db.js");

const Carousel = function(Carousel) {
  this.title = Carousel.title;
  this.description = Carousel.description;
  this.image = Carousel.image;
};

// get all carousels
Carousel.getAll = (result) => {
  let query = "SELECT * FROM carousel";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Carousel by Carousel ID
Carousel.getByID = (id, result) => {
  let query = "SELECT * FROM carousel WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create Carousel
Carousel.create = (newCarousel, result) => {
  sql.query("INSERT INTO carousel SET ?", newCarousel, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Carousel created succesfully !", { ...newCarousel });
    result(null, { ...newCarousel });
  });
};

// update Carousel
Carousel.update = (id, Carousel, result) => {
  sql.query(
    `UPDATE carousel
     SET title=?, image=?, description=?
     WHERE id=?`,
    [Carousel.title, Carousel.image, Carousel.description, id],
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

      console.log("Carousel with id " + id + " updated succesfully !", { id: id, ...Carousel });
      result(null, { id: id, ...Carousel });
    }
  );
};

// delete Carousel by id
Carousel.delete = (id, result) => {
  sql.query("DELETE FROM carousel WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Carousel with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Carousel;