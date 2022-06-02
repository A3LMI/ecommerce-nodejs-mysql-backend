const sql = require("../config/db.js");

const Client = function(client) {
  this.first_name = client.first_name;
  this.last_name = client.last_name;
  this.email = client.email;
  this.password = client.password;
  this.address = client.address;
  this.phone_number = client.phone_number;
};

// get all clients
Client.logIn = (email, password, old_session, result) => {
  let query1 = `
  SELECT * FROM client WHERE email='`+ email +`' AND password='`+ password +`';`;

  sql.query(query1, (err, res) => {
    console.log("searching ! : " + email + " : " + password)

    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.length>0) {
      result(null, res);

      let query2 = `UPDATE sessions SET session_id='`+ old_session+"||"+res[0].id +`' WHERE session_id='`+ old_session + `';`;
      sql.query(query2, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(null, err);
          return;
        }
      });
      
    }
    else if (res.length==0) {
      console.log("not found !")
      result(null, res);
    }

  });
};

// get all clients
Client.logOut = (req, res) => {

};

// get all clients
Client.getAll = (result) => {
  let query = "SELECT * FROM client";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get client by ID
Client.getByID = (id, result) => {
  let query = "SELECT * FROM client WHERE id=" + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// get number of clients
Client.count = (result) => {
  let query = "SELECT count(*) AS count FROM client";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

// create client
Client.create = (newClient, result) => {
  sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Client created succesfully !", { ...newClient });
    result(null, { ...newClient });
  });
};

// update client
Client.update = (id, client, result) => {
  sql.query(
    `UPDATE client
     SET first_name=?, last_name=?, email=?, password=?, address=?, phone_number=?
     WHERE id=?`,
    [client.first_name, client.last_name, client.email, client.password, client.address, client.phone_number, id],
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

      console.log("Client with id " + id + " updated succesfully !", { id: id, ...client });
      result(null, { id: id, ...client });
    }
  );
};

// update first name
Client.updateFirstName = (id, first_name, result) => {
  sql.query(
    `UPDATE client
     SET first_name=?
     WHERE id=?`,
    [first_name, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// update last name
Client.updateLastName = (id, last_name, result) => {
  sql.query(
    `UPDATE client
     SET last_name=?
     WHERE id=?`,
    [last_name, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// update email
Client.updateEmail = (id, email, result) => {
  sql.query(
    `UPDATE client
     SET email=?
     WHERE id=?`,
    [email, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// update phone number
Client.updatePhoneNumber = (id, phone_number, result) => {
  sql.query(
    `UPDATE client
     SET phone_number=?
     WHERE id=?`,
    [phone_number, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// update address
Client.updateAddress = (id, address, result) => {
  sql.query(
    `UPDATE client
     SET address=?
     WHERE id=?`,
    [address, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// update password
Client.updatePassword = (id, password, result) => {
  sql.query(
    `UPDATE client
     SET password=?
     WHERE id=?`,
    [password, id],
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

      console.log("Client with id " + id + " updated succesfully !");
      result(null);
    }
  );
};

// delete client by id
Client.delete = (id, result) => {
  sql.query("DELETE FROM client WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Client with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = Client;