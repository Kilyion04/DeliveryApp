const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Worker = sequelize.define('worker', {
    worker_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'workers',
    timestamps: false
});

module.exports = Worker;
