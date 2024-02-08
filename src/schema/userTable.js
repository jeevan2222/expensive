const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/db");

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  otp: DataTypes.TEXT,
  isemailverified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
