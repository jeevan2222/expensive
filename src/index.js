const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");
require("dotenv").config(); // Fix: Use "dotenv" instead of "env"
const sequelize = require("../src/dbconnection/db");

console.log(
  process.env.DATABASE_NAME,
  process.env.USERNAME,
  process.env.PASSWORD
);
// Synchronize Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
