const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Restaurant = sequelize.define('restaurant', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'restaurants',
  timestamps: false
});

module.exports = Restaurant;
