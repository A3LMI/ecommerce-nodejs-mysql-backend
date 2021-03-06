const sql = require("../config/db.js");

const Session = function(Session) {
  this.session_id = Session.session_id;
  this.expires = Session.expires;
  this.data = Session.data;
};

// get all sessions
Session.getAll = (result) => {
  let query = "SELECT * FROM sessions";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get Session by Session ID
Session.getByID = (id, result) => {
  let query = "SELECT * FROM sessions WHERE session_id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// update SessionID
Session.updateID = (id, Session, result) => {
  sql.query(
    `UPDATE sessions
     SET session_id=?
     WHERE session_id=?`,
    [Session.session_id, id],
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

      console.log("Session with id " + id + " updated succesfully !", { id: id, ...Session });
      result(null, { id: id, ...Session });
    }
  );
};

// delete Session by id
Session.delete = (id, result) => {
  sql.query("DELETE FROM sessions WHERE session_id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Session with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Session;