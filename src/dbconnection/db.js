const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('mymoneytracker', 'mymoneytracker_user', 'otIbgQngZh9vEfJvT6Ne0K1JYyN2lnCx', {
  host: 'dpg-cseg30rtq21c738b6m3g-a.oregon-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
