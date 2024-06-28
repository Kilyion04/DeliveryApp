const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  restaurant_id: {
    type: Number,
    required: true
  },
  article_name: {
    type: String,
    required: true
  },
  article_description: {
    type: String,
    required: true
  },
  article_price: {
    type: Number,
    required: true
  },
  article_type: {
    type: String,
    required: true
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
