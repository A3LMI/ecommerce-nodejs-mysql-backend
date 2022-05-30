const sql = require("../config/db.js");

const CartItem = function(CartItem) {
  this.cart_id = CartItem.cart_id;
  this.product_id = CartItem.product_id;
  this.price = CartItem.price;
  this.quantity = CartItem.quantity;
  this.total = this.price*this.quantity;
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

  let query = `
  INSERT INTO cart_item (cart_id, product_id, price, quantity, total)
  VALUES (`+ newCartItem.cart_id +`, `+ newCartItem.product_id +`, `+ 1 +`, `+ newCartItem.quantity +`, `+ newCartItem.quantity*1 +`);

  UPDATE cart_item c
  INNER JOIN product p ON c.product_id = p.id
  SET c.price = p.price, c.total = c.price*c.quantity";
  `;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Cart Item created succesfully !", { ...newCartItem });
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

// delete CartItem by id (delete product from cart)
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