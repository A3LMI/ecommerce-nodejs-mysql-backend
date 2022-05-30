const CartItem = require("../models/cartItem.js");

exports.getAll = (req, res) => {
  CartItem.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByCartID = (req, res) => {
  CartItem.getByCartID(req.params.cart_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByID = (req, res) => {
  CartItem.getByID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.count = (req, res) => {
  CartItem.count(req.params.cart_id, (err, data) => {
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

  const cart_item = new CartItem ({
    cart_id: req.body.cart_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  });
  
  CartItem.create(cart_item, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CartItem."
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

  CartItem.update(req.params.id, new CartItem(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `CartItem with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating CartItem with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};
*/

exports.delete = (req, res) => {
  CartItem.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cart Item with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting Cart Item with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `Cart Item was deleted successfully!` });
  });
};