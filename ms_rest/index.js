const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/api/restaurants', require('./routes/restaurant'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
