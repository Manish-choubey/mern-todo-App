const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Task = sequelize.define('task', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM('done', 'pending', 'in progress', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

Task.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Task;
