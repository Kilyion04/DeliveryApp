const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/config');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/api/users', require('./routes/user'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
