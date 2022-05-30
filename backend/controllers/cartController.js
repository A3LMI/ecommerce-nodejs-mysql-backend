const Cart = require("../models/cart.js");

exports.getAll = (req, res) => {
  Cart.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByID = (req, res) => {
  Cart.getByID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByClientID = (req, res) => {
  Cart.getByClientID(req.params.client_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByClientAndSession = (req, res) => {
  Cart.getByClientAndSession(req.params.client_id, req.params.session_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.count = (req, res) => {
  Cart.count((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countPurchased = (req, res) => {
  Cart.countPurchased((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.countNotPurchased = (req, res) => {
  Cart.countNotPurchased((err, data) => {
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

  const cart = new Cart ({
    client_id: req.body.client_id,
    session_id: req.body.session_id,
    purchased: false
  });

  Cart.create(cart, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    else res.send(data);
  });
};

/*
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  Cart.update(req.params.id, new Cart(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Cart with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Cart with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};
*/

exports.delete = (req, res) => {
  Cart.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cart with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting Cart with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `Cart was deleted successfully!` });
  });
};