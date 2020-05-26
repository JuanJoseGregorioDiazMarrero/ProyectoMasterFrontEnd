'use strict'
var  validator = require('validator');
var Article = require('../models/article');
const msgSuccess = 'Éxito';
const msgError = 'Error';
var controller = {

    datosCurso: (req, res) => {
        var param = req.body.param;
            return  res.status(200).send({
                status: msgSuccess,
                cursos:'Master en Frameworks JS',
                autor: 'Juan Jose',
                param: param
            });
    },
    test : (req, res) => {
            return res.status(200).send({
                status: msgSuccess,
                message:'Respuesta Controllador de Artículos'
            });
    },
    save: (req, res) => {
        // Validar Datos
        try {
        var params = req.body;
        var hasContent = !validator.isEmpty(params.content);
        var hasTitle = !validator.isEmpty(params.title);
            if(hasContent && hasTitle){
                // Crear Objeto a guardar
                var article = new Article();
                // Asignar  valores
                article.title = params.title;
                article.content = params.content;
                article.image = null;
                article.save((error, articleStored)=> {
                    if (error || !articleStored) {
                        return res.status(404).send({
                            status: msgError,
                            message: 'El artículo no se ha podido guardar '
                        });
                    }
                    return res.status(201).send({
                        status: msgSuccess,
                        article : articleStored
                    });
                })

            } else {
                return res.status(400).send({
                    status: msgError,
                    message: 'Parámetros incompletos o malformados'
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: msgError,
                message: JSON.stringify(error)
            });
        }  
    },
    getAllArticles : (req, res ) => {

        var articles = Article.find({});
        var last = req.params.last;
        if( last || last != undefined){
            articles.limit(5);
        }
     
        articles.sort('-_id').exec((error, articles) => {
            if (error) {
                return res.status(500).send({
                    status: msgError,
                    message: error.toString()
                });
            }
            if (!articles || articles.length == 0){
                return res.status(204).send({
                    status: msgSuccess,
                    message: 'No se encontraron artículos'
                });
            }
            return res.status(200).send({
                status: msgSuccess,
                articles
            });

        })

    
    },
    getArticle: (req, res) => {
        var articleId = req.params.id;
        if(!articleId || articleId == null) 
        {
            return res.status(204).send({
                status: msgError,
                message: 'No se ha especificado el id del artículo a buscar'
            });
        }
        Article.findById(articleId, (err, article) => {
            if(!article || err ) {
                return res.status(404).send({
                    status: msgError,
                    message: 'No se ha encontrado ningún artículo según el id proporcionado'
                }); 
            }
            return res.status(200).send({
                status: msgSuccess,
                article
            });
        });
    },
    updateArticle: (req, res) => {
        // Recoger el id del artículo específicado 
        var articleId = req.params.id;
        // Recoger los datos que llegan por put 
        var params = req.body;
        // Validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err) {
            return res.status(500).send({
                status: msgError,
                message: err.toString()
            });
        }
        if(validate_title && validate_content)
            {
                Article.findOneAndUpdate({_id: articleId}, params, 
                      {new: true}, (err, articleUpdated) => {
                        if(err){
                            return res.status(500).send({
                                status: msgError,
                                message: 'Error en el proceso de actualizar'
                            });
                        }
                        if(!articleUpdated){
                            return res.status(404).send({
                                status: msgError,
                                message: 'No existe el artículo'
                            });
                        }
    
                        return res.status(200).send({
                            status: msgSuccess,
                            articleUpdated
                        });
    
                      });
            } 
    },
    deleteArticle: (req , res) => {
        var articleId = req.params.id;
     
            Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
                if (err) {
                    return res.status(500).send({
                        status: msgError,
                        message: 'Error en el proceso de borrar'
                    });
                }
                if(!articleRemoved){
                    return res.status(404).send({
                        status: msgError,
                        message: 'No se ha borrado el articulo ya que no se pudo encontrar en la BBDD'
                    });
                }
                return res.status(200).send({
                    status: msgSuccess,
                    message: 'Se ha borrado el artículo' + JSON.stringify(articleRemoved)
                });
            });
    }
};

module.exports = controller;
