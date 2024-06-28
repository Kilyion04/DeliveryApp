require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/ms_notifs', require('./routes/notif'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Notification service running on port ${port}`);
});
