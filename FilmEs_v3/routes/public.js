const express = require('express');
let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

/* Servicios GET */
router.get('/', (request, response) =>{
    response.render('public_index');
});

router.get('/buscar', (request, response) =>{
    Pelicula.find({titol: {$regex:request.query.titulo }}).then(resultado => {
        if(resultado.length > 0){
            response.render('public_index', {peliculas:resultado});
        }
        else{
            response.render('public_index', {error:'No shan trobat pelicules'});
        }
    }).catch(error=>{
        response.render('public_error')
    });
});

router.get('/pelicula/:id', (request, response) =>{
    Pelicula.findById(request.params.id).populate('director').then(resultado=>{
        if(resultado){
            response.render('public_pelicula', {pelicula:resultado});
        }
        else{
            response.render('public_error', {error:'Pel.licula no trobada.'})
        }
        
    }).catch(error=>{
        response.render('public_error')
    });
})

module.exports = router;