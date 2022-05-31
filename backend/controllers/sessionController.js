const Session = require("../models/session.js");

exports.getAll = (req, res) => {
  Session.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.getByID = (req, res) => {
  Session.getByID(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  req.session.guest = true;
  req.session.user = null;
  res.send(req.session.id);
};

exports.delete = (req, res) => {
  Session.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Session with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting Session with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `Session was deleted successfully!` });
  });
};