const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'manish1234', {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((error) => console.error('Error connecting to database:', error));

module.exports = sequelize;
