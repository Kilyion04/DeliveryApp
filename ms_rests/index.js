const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());

// Connect to PostgreSQL
connectDB();

const { sequelize } = require('./config/config');
const Restaurant = require('./models/modelRestaurant');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch((err) => {
    console.error('Failed to update database & tables:', err);
  });


// Routes
app.use('/ms_rests', require('./routes/rest'));

app.listen(port, () => {
  console.log(`Restaurant service running on port ${port}`);
});
