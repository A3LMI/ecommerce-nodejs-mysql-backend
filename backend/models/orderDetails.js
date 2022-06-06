const sql = require("../config/db.js");

const OrderDetails = function(orderDetails) {
  this.order_id = orderDetails.order_id;
  this.product_id = orderDetails.product_id;
  this.quantity = orderDetails.quantity;
};

// get all orders details
OrderDetails.getAll = (result) => {
  let query = "SELECT * FROM order_details";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get total by order id
OrderDetails.getTotalByOrderID = (id, result) => {
  let query = `
  SELECT order_details.order_id, SUM(product.price*order_details.quantity) as total
  FROM order_details, product
  WHERE product.id=order_details.product_id AND order_details.order_id=`+ id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get order details by ID
OrderDetails.getByID = (id, result) => {
  let query = "SELECT * FROM order_details WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get order details by order ID
OrderDetails.getByOrderID = (id, result) => {
  let query = "SELECT `order_details`.id, `order_details`.`order_id`, `order_details`.`product_id`, `product`.`title`, `product`.`price`, `order_details`.`quantity` FROM `order_details`, `product` WHERE `order_details`.product_id=`product`.id AND `order_id`=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// total of orders details
OrderDetails.count = (id, result) => {
  let query = "SELECT count(*) AS count FROM order_details WHERE order_id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create order details
OrderDetails.create = (newOrderDetails, result) => {
  sql.query("INSERT INTO order_details SET ?", newOrderDetails, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Order details created succesfully !", { ...newOrderDetails });
    result(null, { ...newOrderDetails });
  });
};

// update orderDetails
OrderDetails.update = (id, orderDetails, result) => {
  sql.query(
    `UPDATE order_details
     SET order_id=?, product_id=?, price=?, quantity=?
     WHERE id=?`,
    [orderDetails.order_id, orderDetails.product_id, orderDetails.price, orderDetails.quantity, id],
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

      console.log("Order details with id " + id + " updated succesfully !", { id: id, ...orderDetails });
      result(null, { id: id, ...orderDetails });
    }
  );
};

// update orderDetails : set delivered
OrderDetails.setDelivered = (id, orderDetails, result) => {
  sql.query(
    `UPDATE order_details
     SET delivered=?
     WHERE id=?`,
    [orderDetails.delivered, id],
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

      console.log("Order details with id " + id + " updated succesfully !", { id: id, ...orderDetails });
      result(null, { id: id, ...orderDetails });
    }
  );
};

// delete orderDetails by id
OrderDetails.delete = (id, result) => {
  sql.query("DELETE FROM order_details WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Order details with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = OrderDetails;