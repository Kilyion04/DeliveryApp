const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/articles', require('./routes/article'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
