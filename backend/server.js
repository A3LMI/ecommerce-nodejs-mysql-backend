const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const session = require("express-session");
const MySQLStore  = require('express-mysql-session')(session);
const db = require("./config/db.js");

const sessionStore = new MySQLStore ({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "ecommerce"
});

const _sessionStore = new MySQLStore ({}, db.connection);

const app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "secret-key",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
    store: sessionStore
}));

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send("Hello, " + req.session.user[0].first_name + " " + req.session.user[0].last_name + ". You are successfully connected !");
  }
  else {
    res.send("Hello guest, you are currently not logged in !");
  }
});

require("./routes/routes.js")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});