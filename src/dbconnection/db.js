const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('test', 'postgres', 'admin12', {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
});


// DATABASE_NAME="test"
// PASSWORD="admin21"
// DATABASE_PORT="5432"
// USERNAME="postgres"
// HOSTNAME="localhost"
// key="shhhhh"

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
