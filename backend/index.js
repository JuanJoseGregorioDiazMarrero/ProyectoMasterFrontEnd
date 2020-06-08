'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
var url='mongodb://127.0.0.1:27017/api_rest_blog';
mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
    console.log('Se ha conectado a la base de datos correctamente');
    // Crear servidor y escuchar peticiones http
    app.listen(port, () => {
        console.log('Servidor ejecutandose en http://localhost:'+ port);
    })
});