const OrderDetails = require("../models/orderDetails.js");

exports.getAll = (req, res) => {
  OrderDetails.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByOrderID = (req, res) => {
  OrderDetails.getByOrderID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.count = (req, res) => {
  OrderDetails.count(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countDelivered = (req, res) => {
  OrderDetails.countDelivered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countNotDelivered = (req, res) => {
  OrderDetails.countNotDelivered((err, data) => {
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

  const orderDetails = new OrderDetails ({
    client_id: req.body.client_id,
    address: req.body.address,
    phone_number: req.body.phone_number,
    delivery_date: req.body.delivery_date,
    delivered: false
  });

  OrderDetails.create(orderDetails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderDetails."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  OrderDetails.update(req.params.id, new OrderDetails(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `OrderDetails with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating OrderDetails with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  OrderDetails.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `OrderDetails with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting OrderDetails with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `OrderDetails was deleted successfully!` });
  });
};