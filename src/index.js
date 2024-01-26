const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const sequelize = require("../src/dbconnection/db");
const { verifyEmail, createUser } = require("./Model/user.model");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/create", createUser);
app.get("/verificationEmail", verifyEmail);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
