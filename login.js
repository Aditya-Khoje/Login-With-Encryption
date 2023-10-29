const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });

// import { final_HASH } from "./SHA512.js";

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aditya",
  database: "CNS",
});

// connect to the database
connection.connect(function (error) {
  if (error) throw error;
  else console.log("connected to the database successfully!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", encoder, function (req, res) {
  // var username = req.body.username;
  // var password = req.body.password;
  // generateHASH512(password);
  // var passkey = encrypt(req.body.password);
  // console.log(passkey);

  var username = req.body.username;
  var password = req.body.password;

  module.exports = { password };
  var SHA256 = require("./SHA512");
  var HASH = SHA256.final_HASH;

  console.log(username);
  console.log(HASH);

  connection.query(
    "select * from user_log_in_details where user_email = ? and user_pass = ?",
    [username, password],
    function (error, results, fields) {
      if (results.length > 0) {
        // console.log(results[0].user_pass);
        res.redirect("/welcome");
      } else {
        console.log("Invalid Username or Password");
        res.redirect("/");
      }
      res.end();
    }
  );
});

// function encrypt(passpass) {
//   return passpass + "1" + "2" + "3";
// }

app.post("/register", encoder, function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  connection.query(
    "INSERT INTO user_log_in_details (user_name, user_email, user_pass) VALUES (?, ?, ?)",
    [name, email, password],
    function (error, results, fields) {
      if (error) {
        console.log("Error registering user: " + error.message);
        res.redirect("/"); // Redirect to the main page on error
      } else {
        console.log("User registered successfully!");
        res.redirect("/welcome"); // Redirect to a welcome page or wherever you'd like
      }
      res.end();
    }
  );
});

// when login is success
app.get("/welcome", function (req, res) {
  res.sendFile(__dirname + "/welcome.html");
});

// set app port
app.listen(4000);
