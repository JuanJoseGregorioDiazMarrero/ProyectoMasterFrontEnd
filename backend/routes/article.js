'use strict'

var express = require('express');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var ArticleController = require('../controllers/article');
var router = express.Router();

const filePathDest = '.' + path.sep + 'upload' + path.sep + 'articles';

const fileStorage = multer.diskStorage({
    destination(req, file, cb){
        cb(null,filePathDest);
    },
    filename(req, file={}, cb){
        const { originalname } = file;
        const fileExtension = originalname.split('.').pop();
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension);
        });
    }
});
var mul_upload = multer({storage: fileStorage});

router.post('/datos-curso', ArticleController.datosCurso);
router.post('/article', ArticleController.save);
router.get('/test-controlador', ArticleController.test);
router.get('/articles/:last?', ArticleController.getAllArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/article-image/:id', mul_upload.single('image') ,ArticleController.uploadArticle);
router.get('/article-image/:name', ArticleController.getImage);


module.exports = router;