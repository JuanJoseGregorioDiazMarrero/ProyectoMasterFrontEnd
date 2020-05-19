'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
var url='mongodb://127.0.0.1:27017/api_rest_blog';
mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
    console.log('Se ha conectado a la base de datos correctamente');
});