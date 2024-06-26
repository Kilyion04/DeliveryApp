const Article = require('../models/modelArticle');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).send(err);
  }
};
