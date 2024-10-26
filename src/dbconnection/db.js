const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('Test', 'postgres', 'admin', {
  host: 'localhost',
  dialect:'postgres'
});

module.exports = sequelize;
