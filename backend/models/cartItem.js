const sql = require("../config/db.js");

const CartItem = function(CartItem) {
  this.cart_id = CartItem.cart_id;
  this.product_id = CartItem.product_id;
  this.quantity = CartItem.quantity;
  this.total = this.product_id*this.quantity;
};

// get Cart Item by ID
CartItem.getByID = (id, result) => {
  let query = "SELECT * FROM cart_item WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Cart Items by Cart ID
CartItem.getByCartID = (cart_id, result) => {
  let query = "SELECT * FROM cart_item WHERE cart_id=" + cart_id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of cart items by Cart ID
CartItem.count = (cart_id, result) => {
  let query = "SELECT count(*) FROM `cart_item`, `cart` WHERE `cart`.`id`=" + cart_id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};


// create Cart Item (add item to cart)
CartItem.create = (newCartItem, result) => {
  sql.query("INSERT INTO cart_item SET ?", newCartItem, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("CartItem created succesfully !", { ...newCartItem });
    result(null, { ...newCartItem });
  });
};

/*
// update CartItem
CartItem.update = (id, CartItem, result) => {
  sql.query(
    `UPDATE cart_item
     SET client_id=?, address=?, phone_number=?, delivery_date=?, delivered=?
     WHERE id=?`,
    [CartItem.client_id, CartItem.address, CartItem.phone_number, CartItem.delivery_date, CartItem.delivered, id],
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

      console.log("CartItem with id " + id + " updated succesfully !", { id: id, ...CartItem });
      result(null, { id: id, ...CartItem });
    }
  );
};
*/

// delete CartItem by id
CartItem.delete = (id, result) => {
  sql.query("DELETE FROM cart_item WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("CartItem with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = CartItem;