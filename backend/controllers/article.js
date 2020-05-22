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

        Article.find({}).sort('-_id').exec((error, articles) => {
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

    
    }
};

module.exports = controller;
