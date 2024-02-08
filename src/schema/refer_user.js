const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/db");

const referUserTable = sequelize.define("Refer_user", {
  user_id: DataTypes.TEXT,
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  phone: DataTypes.TEXT,
});

module.exports = referUserTable;
