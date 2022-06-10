const Order = require("../models/order.js");

exports.getAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByDate = (req, res) => {
  Order.getByDate(req.params.date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getDelivered = (req, res) => {
  Order.getDelivered(req.params.date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByDateNotViewed = (req, res) => {
  Order.getByDateNotViewed(req.params.date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByDateViewed = (req, res) => {
  Order.getByDateViewed(req.params.date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByID = (req, res) => {
  Order.getByID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByClientID = (req, res) => {
  Order.getByClientID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByClientIDv2 = (req, res) => {
  Order.getByClientIDv2(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.count = (req, res) => {
  Order.count((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countDelivered = (req, res) => {
  Order.countDelivered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countNotDelivered = (req, res) => {
  Order.countNotDelivered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const order = new Order ({
    client_id: req.body.client_id,
    address: req.body.address,
    phone_number: req.body.phone_number,
    delivery_date: req.body.delivery_date,
    delivered: false,
    viewed: false,
    message: req.body.message
  });

  const order_items = req.body.cart_items;

  Order.create(req.params.cart_id, order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};

exports.setViewed = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  Order.setViewed(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Order with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Order with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  Order.update(req.params.id, new Order(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Order with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Order with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};

exports.setOrderDelivered = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  Order.setOrderDelivered(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Order with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Order with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Order.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Order with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting Order with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};