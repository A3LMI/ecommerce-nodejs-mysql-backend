const sql = require("../config/db.js");

const CartItem = function(CartItem) {
  this.cart_id = CartItem.cart_id;
  this.product_id = CartItem.product_id;
  this.quantity = CartItem.quantity;
};

// get all carts items
CartItem.getAll = (result) => {
  let query = "SELECT * FROM cart_item";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Cart Item by ID
CartItem.getByID = (id, result) => {
  let query = `
  SELECT cart_item.id, cart_item.cart_id, cart_item.product_id, product.title, product.price, cart_item.quantity, product.price*cart_item.quantity AS total
  FROM cart_item, product
  WHERE product.id=cart_item.product_id AND id=`+ id +`
  `;

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
  let query = `
  SELECT cart_item.id, cart_item.cart_id, cart_item.product_id, product.title, product.image, product.price, cart_item.quantity, product.price*cart_item.quantity AS total
  FROM cart_item, product
  WHERE product.id=cart_item.product_id AND cart_id=`+ cart_id +`
  `;

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
  let query = "SELECT count(*) AS count FROM `cart_item`, `cart` WHERE `cart`.`id`=" + cart_id;

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
  INSERT INTO cart_item (cart_id, product_id, quantity)
  VALUES (`+ newCartItem.cart_id +`, `+ newCartItem.product_id +`, `+ newCartItem.quantity +`)
  ON DUPLICATE KEY UPDATE quantity=quantity+`+ newCartItem.quantity +`;`;

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

// update CartItem
CartItem.update = (id, CartItem, result) => {
  sql.query(
    `UPDATE cart_item
     SET cart_id=?, product_id=?, quantity=?
     WHERE id=?`,
    [CartItem.cart_id, CartItem.product_id, CartItem.quantity, id],
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