const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

router.get('/', ArticleController.getAllArticles);
router.post('/', ArticleController.createArticle);

module.exports = router;
