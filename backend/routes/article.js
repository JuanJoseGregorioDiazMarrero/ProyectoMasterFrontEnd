'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');
var router = express.Router();

router.post('/datos-curso', ArticleController.datosCurso);
router.post('/article', ArticleController.save);
router.get('/test-controlador', ArticleController.test);
router.get('/articles/:last?', ArticleController.getAllArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);

module.exports = router;