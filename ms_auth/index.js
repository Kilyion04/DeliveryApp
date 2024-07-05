require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3008;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/ms_auth', authRoutes);

app.listen(port, () => {
    console.log(`Auth service running on port ${port}`);
});
