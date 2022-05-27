const sql = require("../config/db.js");

const Order = function(order) {
  this.client_id = order.client_id;
  this.address = order.address;
  this.phone_number = order.phone_number;
  this.delivery_date = order.delivery_date;
  this.delivered = false;
};

// get all orders
Order.getAll = (result) => {
  let query = "SELECT * FROM order";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get order by ID
Order.getByID = (id, result) => {
  let query = "SELECT * FROM order WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get order by client ID
Order.getByClientID = (id, result) => {
  let query = "SELECT * FROM order WHERE client_id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of orders
Order.count = (result) => {
  let query = "SELECT count(*) AS count FROM order";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of orders delivered
Order.countDelivered = (result) => {
  let query = "SELECT count(*) AS count FROM order WHERE delivered=1";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of orders NOT delivered
Order.countNotDelivered = (result) => {
  let query = "SELECT count(*) AS count FROM order WHERE delivered=0";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create order
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO order SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Order created succesfully !", { ...newOrder });
    result(null, { ...newOrder });
  });
};

// update order
Order.update = (id, order, result) => {
  sql.query(
    `UPDATE order
     SET client_id=?, address=?, phone_number=?, delivery_date=?, delivered=?
     WHERE id=?`,
    [order.client_id, order.address, order.phone_number, order.delivery_date, order.delivered, id],
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

      console.log("Order with id " + id + " updated succesfully !", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

// delete order by id
Order.delete = (id, result) => {
  sql.query("DELETE FROM order WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Order with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Order;