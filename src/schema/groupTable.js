const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("../schema/userTable");
const sequelize = require("../dbconnection/db");

const Group = sequelize.define("group", {
  user_id: DataTypes.TEXT,
  name: DataTypes.TEXT,
  strength: DataTypes.TEXT,
});

User.belongsToMany(Group, { through: "UserGroup", foreignKey: "user_id" });
Group.belongsToMany(User, { through: "UserGroup", foreignKey: "group_id" });

module.exports = Group;
