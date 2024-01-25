const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "jeevan",
  "jeevan_user",
  "t8eeDDiVagSvT9ccBfHhI9ix8PPjsoAv",
  {
    host: "cmomniq1hbls73bn1etg-a.oregon-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This line is crucial for Render
      },
    },
  }
);

module.exports = sequelize;
