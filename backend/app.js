'use strict'
// Cargar modules de Node para el servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar Express
var app = express();

// Cargar ficheros de rutas


// Middlewares

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors

// Añadir prefijos a rutas

// Rutas para API REST
app.get('/datos-curso', function(req, res){

   return  res.status(200).send({
       cursos:'Master en Frameworks JS',
       autor: 'Juan Jose',
   });
});

// Exportación del mmódulo
module.exports = app;

