const express = require('express');
const sha256 = require("crypto-js/sha256");

let Usuario = require(__dirname + '/../models/usuari.js');
let router = express.Router();

router.get('/', (request, response) =>{
    response.render('auth_login');
});

router.post('/', (request, response) =>{
    let nombre = request.body.login;
    let pass = sha256(request.body.password).toString();

    Usuario.find({login: nombre, password:pass}).then( resultado =>{
        if(resultado.length > 0){
            request.session.usuario = resultado[0];
            response.render('public_index');
        }else{
            response.render('auth_login', {error: "Usuario o contraseña incorrectos"})
        }
    }).catch(error =>{
        response.render('auth_login', {error: "Usuario o contraseña incorrectos"})
    })
})

module.exports = router;