require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupProxies = require('./proxyMiddleware');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Setup proxies
setupProxies(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
