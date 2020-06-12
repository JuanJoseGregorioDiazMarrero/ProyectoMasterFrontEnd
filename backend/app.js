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
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


// Rutas para API REST
var article_routes = require('./routes/article');
// Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

/*app.get('/datos-curso', function(req, res){

   return  res.status(200).send({
       cursos:'Master en Frameworks JS',
       autor: 'Juan Jose'
   });
});
app.post('/datos-curso', function(req, res){

    var param = req.body.hola;
    return res.status(200).send({
        cursos:'Master en Frameworks JS',
        autor: 'Juan Jose',
        hola: param
    });
 });
 */
 


// Exportación del mmódulo
module.exports = app;

