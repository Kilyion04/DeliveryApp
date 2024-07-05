require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');
const restaurantRoutes = require('./routes/rest'); // Import the restaurant routes

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/api/ms_rests', restaurantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Restaurants service running on port ${port}`);
});
