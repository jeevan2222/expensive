const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");
const { verifyAdminToken ,verifyToken} = require("./utils/requiredtoken");
const cors = require("cors");
const {validateRequest} = require("./utils/validation")

require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const sequelize = require("../src/dbconnection/db");
const {
  verifyEmail,
  createUser,
  addBill,
  loginUser,
  dashboard,
} = require("./Model/user.model");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// myStore.sync();
app.post("/create",validateRequest ,createUser);
app.post("/login", loginUser);
app.get("/verificationEmail", verifyEmail);
app.post("/add-bill",verifyToken, addBill);
app.post("/dashboard", verifyAdminToken, dashboard);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
