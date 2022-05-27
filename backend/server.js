const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const session = require("express-session");
const mysql_session = require('express-mysql-session')(session);

const store = new mysql_session({
  uri: "http://localhost:3600",
  collection: "mySessions"
});

const app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "secret-key",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}));

var corsOptions = {
  origin: ""
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "E-commerce application is running !" });
});

app.get("/client/login", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user});
  }
  else {
    res.send({loggedIn: false});
  }
});

require("./routes/routes.js")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});