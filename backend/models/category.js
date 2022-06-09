const sql = require("../config/db.js");

const Category = function(category) {
  this.title = category.title;
  this.image = category.image;
  this.parent = category.parent;
  this.level = category.level;
  this.recommendation = category.recommendation;
};

// get all categories
Category.getAll = (result) => {
  let query = "SELECT * FROM category";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get category by level
Category.getByLevel = (level, result) => {
  let query = "SELECT * FROM category WHERE level=" + level;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get category by ID
Category.getByID = (id, result) => {
  let query = "SELECT * FROM category WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get category by name
Category.getCategoryByName = (name, result) => {
  let query = "SELECT * FROM category WHERE title LIKE '%" + name + "%'";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get number of categories
Category.count = (result) => {
  let query = "SELECT count(*) AS count FROM category";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create category
Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Category created succesfully !", { ...newCategory });
    result(null, { ...newCategory });
  });
};

// update category
Category.update = (id, category, result) => {
  sql.query(
    `UPDATE category
     SET title=?, image=?, parent=?, level=?, recommendation=?, created_at=?, modified_at=?
     WHERE id=?`,
    [category.title, category.image, category.parent, category.level, category.recommendation, category.created_at, category.modified_at, id],
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

      console.log("Category with id " + id + " updated succesfully !", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

// update title
Category.updateTitle = (id, title, result) => {
  sql.query(
    `UPDATE category
     SET title=?
     WHERE id=?`,
    [title, id],
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

      console.log("Category with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// delete category by id
Category.delete = (id, result) => {
  sql.query("DELETE FROM category WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Category with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Category;