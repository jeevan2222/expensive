const express = require("express");
const app = express();
const port = 4321;
const ejs = require("ejs");
const path = require("path");
const { verifyAdminToken, verifyToken } = require("./utils/requiredtoken");
const cors = require("cors");
const { validateRequest, authentication } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const {getAmountInfo}=require("./Model/invitation.model");
const cron = require('node-cron')
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
  createGroup,
  invite,
  getMoney
} = require("./Model/user.model");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// myStore.sync();
app.post("/create", validateRequest, createUser);
app.post("/login", loginUser);
app.get("/verificationEmail", authentication, verifyEmail);
app.post("/add-bill", authentication, verifyToken, addBill);
app.post("/dashboard", authentication, verifyAdminToken, dashboard);
app.post("/creategroup", authentication, verifyToken, createGroup);
app.post("/invite", invite);
app.post("/trackmoney", getMoney);
app.get("/", (req, res) => {
  res.render("home");
});
app.use(function (req, res, next) {
  next(
    res.status(404).json({
      status: 404,
      error: true,
      message: "No Such URL",
      data: null,
    })
  );
});
// cron.schedule("*/30 * * * * *", () => {
//   getAmountInfo();
// });


//its runs every data at 6 AM
// cron.schedule("0 6 * * *", () => {
//   getAmountInfo();
// });

// cron.schedule("*/3 * * * * *", () => {
//   console.log("Task is running every 3 seconds");
//   // Place your task code here
//   getAmountInfo();
// });
app.listen(port, () => {
  console.log("Server running on port", port);
});
