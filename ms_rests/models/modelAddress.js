// modelAddress.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Address = sequelize.define('address', {
  address_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_complement: {
    type: DataTypes.STRING
  },
  address_street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_neighbor: {
    type: DataTypes.STRING
  },
  address_city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_departement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_region: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address_country: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'addresses',
  timestamps: false
});

Address.associate = (models) => {
  Address.hasMany(models.Restaurant, { foreignKey: 'address_id' });
};

module.exports = Address;
