'use strict'
var  validator = require('validator');
var Article = require('../models/article');
var controller = {

    datosCurso: (req, res) => {
        var param = req.body.param;
            return  res.status(200).send({
                cursos:'Master en Frameworks JS',
                autor: 'Juan Jose',
                param: param
            });
    },
    test : (req, res) => {
            return res.status(200).send({
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
                                status:'error',
                                message: 'El artículo no se ha podido guardar '
                            });
                        }
                        return res.status(200).send({
                            status:'success',
                            article : articleStored
                        });
                    })

                } else {
                    return res.status(400).send({
                        message: 'Parámetros incompletos o malformados'
                    });
                }
            } catch (error) {
                return res.status(500).send({
                    status: "Error",
                    message: JSON.stringify(error)
                });
            }

        

        

            // Almacenar objeto

            // Responder 
         
    }
};

module.exports = controller;
