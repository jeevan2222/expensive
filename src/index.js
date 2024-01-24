const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home"); // Assuming "home" is the correct name of your EJS file without the "view/" prefix
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
