const sql = require("../config/db.js");

const Product = function(product) {
  this.title = product.title;
  this.description = product.description;
  this.price = product.price;
  this.category_id = product.category_id;
  this.image = product.image;
  this.rating = 0;
  this.quantity = 0;
};

// add product to cart
Product.addToCart = (result) => {
  sql.query("INSERT INTO cart SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Product created succesfully !", { ...newProduct });
    result(null, { ...newProduct });
  });
};

// get all products
Product.getAll = (result) => {
  let query = "SELECT * FROM product";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get all products v2
Product.getAllMore = (result) => {
  let query = "SELECT product.id, product.title, product.description, product.image, product.price, product.category_id, category.title AS `category_title` FROM `product`, `category` WHERE `category`.`id`=`category_id`";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get product by name
Product.getProductByName = (name, result) => {
  let query = "SELECT * FROM product WHERE title LIKE '%" + name + "%'";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get product by ID
Product.getByID = (id, result) => {
  let query = "SELECT * FROM product WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get number of products
Product.count = (result) => {
  let query = "SELECT count(*) AS count FROM product";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create product
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Product created succesfully !", { ...newProduct });
    result(null, { ...newProduct });
  });
};

// update product
Product.update = (id, product, result) => {
  sql.query(
    `UPDATE product
     SET title=?, description=?, price=?, category_id=?, image=?, rating=?, quantity=?, created_at=?, modified_at=?
     WHERE id=?`,
    [product.title, product.description, product.price, product.category_id, product.image, product.rating, product.quantity, product.created_at, product.modified_at, id],
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

      console.log("Product with id " + id + " updated succesfully !", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

// delete product by id
Product.delete = (id, result) => {
  sql.query("DELETE FROM product WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Product with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Product;