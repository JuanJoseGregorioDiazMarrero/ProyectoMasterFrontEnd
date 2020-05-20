'use strict'
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
    }
};

module.exports = controller;
