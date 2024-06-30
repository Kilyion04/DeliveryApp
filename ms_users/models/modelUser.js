// models/modelUser.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const Address = require('./modelAddress');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.TEXT
  },
  access_token: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  telephone: {
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
  tableName: 'users',
  timestamps: false
});

User.associate = (models) => {
  User.belongsTo(models.Address, { foreignKey: 'address_id' });
};

module.exports = User;
