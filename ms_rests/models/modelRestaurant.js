// modelRestaurant.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const Address = require('./modelAddress');

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
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  address_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'addresses',
      key: 'address_id'
    }
  }
}, {
  tableName: 'restaurants',
  timestamps: false
});

Restaurant.associate = (models) => {
  Restaurant.belongsTo(models.Address, { foreignKey: 'address_id' });
};

module.exports = Restaurant;
