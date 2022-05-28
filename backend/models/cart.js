const sql = require("../config/db.js");

const Cart = function(Cart) {
  this.client_id = Cart.client_id;
  this.address = Cart.address;
  this.phone_number = Cart.phone_number;
  this.delivery_date = Cart.delivery_date;
  this.delivered = Cart.delivered;
};

// get Cart by client ID
Cart.getByClientID = (client_id, result) => {
  let query = "SELECT * FROM cart WHERE client.id=" + client_id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Cart by client ID andd Session ID
Cart.getByClientAndSession = (client_id, session_id, result) => {
  let query = "SELECT * FROM cart WHERE client.id=" + client_id + "client_id AND session_id='" + session_id + "'";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Cart by Cart ID
Cart.getByID = (id, result) => {
  let query = "SELECT * FROM cart WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of Carts
Cart.count = (result) => {
  let query = "SELECT count(*) AS count FROM cart";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of Carts purchased
Cart.countPurchased = (result) => {
  let query = "SELECT count(*) AS count FROM cart WHERE purchased=1";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of Carts NOT purchased
Cart.countNotPurchased = (result) => {
  let query = "SELECT count(*) AS count FROM cart WHERE purchased=0";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create Cart
Cart.create = (newCart, result) => {
  sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Cart created succesfully !", { ...newCart });
    result(null, { ...newCart });
  });
};

/*
// update Cart
Cart.update = (id, Cart, result) => {
  sql.query(
    `UPDATE cart
     SET client_id=?, address=?, phone_number=?, delivery_date=?, delivered=?
     WHERE id=?`,
    [Cart.client_id, Cart.address, Cart.phone_number, Cart.delivery_date, Cart.delivered, id],
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

      console.log("Cart with id " + id + " updated succesfully !", { id: id, ...Cart });
      result(null, { id: id, ...Cart });
    }
  );
};
*/

// delete Cart by id
Cart.delete = (id, result) => {
  sql.query("DELETE FROM cart WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Cart with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Cart;