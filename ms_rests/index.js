const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/ms_rests', require('./routes/rest'));

app.listen(port, () => {
  console.log(`Restaurant service running on port ${port}`);
});
