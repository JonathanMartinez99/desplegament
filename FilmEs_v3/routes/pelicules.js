const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();
const auth = require(__dirname + '/../utils/auth.js')


/** SERVICIOS GET */

router.get('/', auth.autenticacion() , (request, response) =>{
    Pelicula.find().then(resultado =>{
        if(resultado.length > 0){
            response.render('admin_pelicules', {peliculas:resultado});
        }
        else{
            response.render('admin_pelicules', {error:'No nhi ha pelicules.'});
        }
    }).catch(error =>{
        response.render('admin_error');
    });
});

router.get('/nova', (request, response) =>{
    response.render('admin_pelicules_form');
});

router.get('/editar/:id', (request, response) =>{
    Pelicula.findById(request.params.id).then(resultado=>{
        if(resultado){
            response.render('admin_pelicules_form', {pelicula:resultado});
        }
        else{
            response.render('admin_error', {error:'Pel.licula no trobada'});
        }
    }).catch(error=>{
        response.render('admin_error');
    })
})


//POST

router.post('/', (request, response) =>{
    let nuevaPelicula = new Pelicula({
        titol:request.body.titol,
        sinopsi:request.body.sinopsi,
        duracio:request.body.duracio,
        valoracio:request.body.valoracio,
        genere:request.body.genere,
        director:request.body.director,
        imatge:request.body.imatge
    });

    nuevaPelicula.save().then(resultado =>{
        response.redirect(req.baseUrl);
    }).catch(error => {
        response.render('admin_error');
    });
})

//DELETE

router.delete('/:id', (request, response) =>{
    Pelicula.findByIdAndRemove(request.params.id).then(resultado => {
        if(resultado)
        {
            response.redirect(request.baseUrl);
        }
        else{
            response.render('admin_error', {error: 'Error esborrant la pel.licula'})
        }
    }).catch(error =>{
        response.render('admin_error')
    })
})

module.exports = router;