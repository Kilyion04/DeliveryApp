// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');
const User = require('./models/modelUser');
const Address = require('./models/modelAddress');

const app = express();
const port = process.env.PORT || 3007;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  req.on('aborted', () => {
    console.error('Request aborted by the client');
  });
  next();
});

// Connect to PostgreSQL
connectDB();

// Initialize models and associations
User.associate({ Address });
Address.associate({ User });

// Routes
app.use('/ms_users', require('./routes/user'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

const server = app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});

server.timeout = 30000; // 30 secondes
