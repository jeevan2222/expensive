const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const sequelize = require("../src/dbconnection/db");
const createUser = require("./Model/user.model");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/create", createUser);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
