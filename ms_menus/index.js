require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/config');
const menuRoutes = require('./routes/menu'); 

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());
app.use(cors());

// Middleware pour journaliser les requêtes
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

connectDB();

app.use('/api/ms_menus', menuRoutes); 

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Menu service running on port ${port}`);
});
