const { query } = require("../config/db.js");
const sql = require("../config/db.js");

const Order = function(order) {
  this.id = order.id;
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
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total, SUM(order_details.quantity) as quantity FROM `dbCha`.order, `dbCha`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id GROUP BY `order`.id";

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
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total, SUM(order_details.quantity) as quantity FROM `dbCha`.order, `dbCha`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND `order`.`delivery_date` LIKE '"+ date +"%' GROUP BY `order`.`id`";
  
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
  let query = "SELECT `order`.id, `order`.`client_id`, `client`.`first_name`, `client`.`last_name`, `order`.`address`, `order`.`phone_number`, `order`.`message`, `order`.`delivery_date`, SUM(`order_details`.`quantity`) as quantity, `order`.`delivered`, `order`.`viewed`, SUM(`product`.`price`*`order_details`.`quantity`) as total, `order`.`created_at` FROM `dbCha`.`order`, `client`, `product`, `order_details` WHERE `order`.`client_id`=`client`.`id` AND `product`.`id`=`order_details`.`product_id` AND `order`.id=`order_details`.`order_id` AND `order`.`delivery_date` LIKE '"+ date +"%' AND `order`.delivered=1 GROUP BY `order`.`id`";

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
  let query = "SELECT `order`.id, `order`.`client_id`, `client`.`first_name`, `client`.`last_name`, `order`.`address`, `order`.`phone_number`, `order`.`message`, `order`.`delivery_date`, SUM(`order_details`.`quantity`) as quantity, `order`.`delivered`, `order`.`viewed`, SUM(`product`.`price`*`order_details`.`quantity`) as total, `order`.`created_at` FROM `dbCha`.`order`, `client`, `product`, `order_details` WHERE `order`.`client_id`=`client`.`id` AND `product`.`id`=`order_details`.`product_id` AND `order`.id=`order_details`.`order_id` AND `order`.`delivery_date` LIKE '"+ date +"%' AND viewed=0 GROUP BY `order`.`id`";

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
  let query = "SELECT `order`.id, `order`.`client_id`, `client`.`first_name`, `client`.`last_name`, `order`.`address`, `order`.`phone_number`, `order`.`message`, `order`.`delivery_date`, SUM(`order_details`.`quantity`) as quantity, `order`.`delivered`, `order`.`viewed`, SUM(`product`.`price`*`order_details`.`quantity`) as total, `order`.`created_at` FROM `dbCha`.`order`, `client`, `product`, `order_details` WHERE `order`.`client_id`=`client`.`id` AND `product`.`id`=`order_details`.`product_id` AND `order`.id=`order_details`.`order_id` AND `order`.`delivery_date` LIKE '"+ date +"%' AND viewed=1 GROUP BY `order`.`id`";

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
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total, SUM(order_details.quantity) as quantity FROM `dbCha`.order, `dbCha`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND `order`.id="+ id;
  
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
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total, SUM(order_details.quantity) as quantity FROM `dbCha`.order, `dbCha`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND client_id="+ id +" GROUP BY `order`.`id`";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get order by client ID V2
Order.getByClientIDv2 = (id, result) => {
  let query = "SELECT `order`.id, `order`.viewed,`order`.client_id, `order`.address, `order`.phone_number, `order`.message, `order`.delivery_date, `order`.delivered, client.first_name, client.last_name, `order`.created_at, SUM(product.price*order_details.quantity) as total, SUM(order_details.quantity) as quantity FROM `dbCha`.order, `dbCha`.client, product, order_details WHERE client.id=`order`.`client_id` AND `order`.`id`=order_details.order_id AND product.id=order_details.product_id AND client_id="+ id +" GROUP BY `order`.`id`";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    let order_id = res;

    let order_details;

    let i = 0;
    while (i<res.length) {
      let query1 = "SELECT `order_details`.id, `order_details`.`order_id`, `order_details`.`product_id`, `product`.`title`, `product`.`price`, `order_details`.`quantity` FROM `order_details`, `product` WHERE `order_details`.product_id=`product`.id AND `order_id`=" + res[i].id;

      console.log(res[0].id)
      sql.query(query1, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(null, err);
          return;
        }

        order_details = res;
      });
      i++;
    }

    console.log(order_details);

    result(null, res);
    
    //result(null, {res, order_details});
    
  });
};

// total of orders
Order.count = (result) => {
  let query = "SELECT count(*) AS count FROM dbCha.order";

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
  let query = "SELECT count(*) AS count FROM dbCha.order WHERE delivered=1";

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
  let query = "SELECT count(*) AS count FROM dbCha.order WHERE delivered=0";

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
Order.create = (cart_id, newOrder, result) => {
  sql.query("INSERT INTO dbCha.order SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Order created succesfully !", { ...newOrder });

    let query = "SELECT * FROM `dbCha`.`order` WHERE `client_id`="+ newOrder.client_id +" ORDER BY `created_at` DESC LIMIT 1";

    sql.query(query, (err, res) => {

      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      let order_id = res[0].id;

      let query_ = "SELECT * FROM `cart_item` WHERE `cart_id`="+ cart_id +";";

      sql.query(query_, (err, res) => {

        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        result(null, res);

        let i = 0;
        do {
          let query1 = "INSERT INTO `order_details`(`order_id`, `product_id`, `quantity`, `delivered`) VALUES ("+ order_id +", "+ res[i].product_id +", "+ res[i].quantity +", 1)"
    
          sql.query(query1, (err, res) => {
            if (err) {
              console.log("Error: ", err);
              result(err, null);
              return;
            }
        
            console.log("Order items created succesfully !");
          });
          i++;
        }
        while (i<res.length)
        
      });
    });

       /* 
    for (i=0; i<order_items.length; i++) {

    }
    
    order_items.forEach(element => {
      let query1 = "INSERT INTO `order_details`(`order_id`, `product_id`, `quantity`, `delivered`) VALUES ("+ newOrder.id +", "+ element.product_id +", "+ element.quantity +", 1)"

      sql.query(query1, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
    
        console.log("Order items created succesfully !");
      });
    });
    */
    
  });
};

// update order
Order.update = (id, order, result) => {
  sql.query(
    `UPDATE dbCha.order
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
    `UPDATE dbCha.order
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

// set delivered order
Order.setOrderDelivered = (id, result) => {
  sql.query(
    `UPDATE dbCha.order
     SET delivered=true
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
  sql.query("DELETE FROM dbCha.order WHERE id=?", id, (err, res) => {
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