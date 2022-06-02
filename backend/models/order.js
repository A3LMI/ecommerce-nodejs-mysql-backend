const sql = require("../config/db.js");

const Order = function(order) {
  this.client_id = order.client_id;
  this.address = order.address;
  this.phone_number = order.phone_number;
  this.delivery_date = order.delivery_date;
  this.delivered = order.delivered;
  this.viewed = order.viewed;
  this.message = order.message;
};

// get all orders
Order.getAll = (result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total FROM `ecommerce`.order, `ecommerce`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get orders by date
Order.getByDate = (date, result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total FROM `ecommerce`.order, `ecommerce`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND delivery_date LIKE '"+ date +"%' GROUP BY `order`.id";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get orders delivered
Order.getDelivered = (date, result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total FROM `ecommerce`.order, `ecommerce`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND delivery_date LIKE '"+ date +"%' AND delivered=1 GROUP BY `order`.id";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get orders by date not viewed
Order.getByDateNotViewed = (date, result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total FROM `ecommerce`.order, `ecommerce`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND delivery_date LIKE '"+ date +"%' AND viewed=0  GROUP BY `order`.id";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get orders by date viewed
Order.getByDateViewed = (date, result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total FROM `ecommerce`.order, `ecommerce`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND delivery_date LIKE '"+ date +"%' AND viewed=1  GROUP BY `order`.id";

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
  let query = "SELECT * FROM ecommerce.order WHERE id=" + id;

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
  let query = "SELECT * FROM ecommerce.order WHERE client_id=" + id;

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
  let query = "SELECT count(*) AS count FROM ecommerce.order";

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
  let query = "SELECT count(*) AS count FROM ecommerce.order WHERE delivered=1";

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
  let query = "SELECT count(*) AS count FROM ecommerce.order WHERE delivered=0";

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
  sql.query("INSERT INTO ecommerce.order SET ?", newOrder, (err, res) => {
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
    `UPDATE ecommerce.order
     SET client_id=?, address=?, phone_number=?, delivery_date=?, delivered=?, viewed=?
     WHERE id=?`,
    [order.client_id, order.address, order.phone_number, order.delivery_date, order.delivered, order.viewed, id],
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

// set viewed order
Order.setViewed = (id, result) => {
  sql.query(
    `UPDATE ecommerce.order
     SET viewed=true
     WHERE id=?`,
    [id],
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

      console.log("Order with id " + id + " updated succesfully !", { id: id });
      result(null);
    }
  );
};

// delete order by id
Order.delete = (id, result) => {
  sql.query("DELETE FROM ecommerce.order WHERE id=?", id, (err, res) => {
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