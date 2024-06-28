const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3008;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/ms_auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
