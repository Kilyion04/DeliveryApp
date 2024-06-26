const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  menu_id: Number,
  article_name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Article', ArticleSchema);
