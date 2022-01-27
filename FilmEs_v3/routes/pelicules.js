const express = require('express');
const multer = require('multer');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();
let auth = require('../utils/auth.js')

let storage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (request, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

let upload = multer({storage: storage});


/** SERVICIOS GET */

router.get('/', auth.autenticacion , (request, response) =>{
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

router.get('/nova', auth.autenticacion , (request, response) =>{
    response.render('admin_pelicules_form');
});

router.get('/editar/:id', auth.autenticacion , (request, response) =>{
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

router.post('/', upload.single('imatge'), auth.autenticacion, (request, response) =>{
    let nuevaPelicula = new Pelicula({
        titol:request.body.titol,
        sinopsi:request.body.sinopsi,
        duracio:request.body.duracio,
        valoracio:request.body.valoracio,
        genere:request.body.genere,
        director:request.body.director,
        imatge:request.file.filename
    });

    nuevaPelicula.save().then(resultado =>{
        response.redirect(request.baseUrl);
    }).catch(error => {
        response.render('admin_error');
        console.log(error);
    });
})


//PUT

router.put('/:id', upload.single('imatge'), auth.autenticacion, (request, response) =>{
    
    let editada = {
        titol: request.body.titol,
            sinopsi: request.body.sinopsi,
            duracio: request.body.duracio,
            genere: request.body.genere,
            valoracio: request.body.valoracio,
            director: request.body.director
    }
    if(request.file.filename !== undefined){
        editada = {
            titol: request.body.titol,
                sinopsi: request.body.sinopsi,
                duracio: request.body.duracio,
                genere: request.body.genere,
                valoracio: request.body.valoracio,
                director: request.body.director,
                imatge: request.file.filename
        }
    }
    
    Pelicula.findByIdAndUpdate(request.params.id, {
        $set: {
            editada
        }
    }, {new: true}).then(resultado => {
        if(resultado){
            response.redirect(request.baseUrl);
        }
        else{
            response.render('admin_error');
        }
    }).catch(error => {
        response.render('admin_error');
    });
})

//DELETE

router.delete('/:id', auth.autenticacion , (request, response) =>{
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