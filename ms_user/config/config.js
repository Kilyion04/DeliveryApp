const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('deliveryapp', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
