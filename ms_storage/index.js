require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config'); // Assurez-vous que le chemin est correct
const workerRoutes = require('./routes/routeWorker');

const app = express();
const port = process.env.PORT || 3009;

app.use(bodyParser.json());

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/api/ms_storage', workerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`User-Restaurant service running on port ${port}`);
});
