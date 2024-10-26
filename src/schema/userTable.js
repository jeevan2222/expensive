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
  role: {
    type: DataTypes.ENUM,
    values: ['reader', 'writer', 'administrator'],
  }
});
//  sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
module.exports = User;
