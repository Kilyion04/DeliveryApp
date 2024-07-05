// index.js de ms_articles
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');
const articleRoutes = require('./routes/article');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/ms_articles', articleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`Article service running on port ${port}`);
});
