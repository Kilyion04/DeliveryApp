require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupProxies = require('./proxyMiddleware');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Configurer les proxies pour chaque microservice
setupProxies(app);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
