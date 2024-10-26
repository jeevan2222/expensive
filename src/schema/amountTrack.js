const { Sequelize, Model, DataTypes } = require("sequelize");
// const User = require("../schema/userTable");
const sequelize = require("../dbconnection/db");

const AmountTrack = sequelize.define("amountTrack", {
  email: DataTypes.TEXT,
  paid_to: DataTypes.TEXT,
  date: DataTypes.TEXT,
  message: DataTypes.TEXT,
  amount:DataTypes.TEXT
});

//  sequelize.sync({ force: true });
module.exports = AmountTrack;
