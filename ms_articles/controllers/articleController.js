const Article = require('../models/modelArticle');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!article) {
      return res.status(404).send({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).send({ message: 'Article not found' });
    }
    res.send({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
