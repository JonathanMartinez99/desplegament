const mongoose = require('mongoose');
const sha256 = require("crypto-js/sha256");
const Usuari = require(__dirname + '/../models/usuari');

mongoose.connect('mongodb://localhost:27017/filmes');

Usuari.collection.drop();

let usu1 = new Usuari({
    login: 'jonathan',
    password: sha256('12345678')
});
usu1.save();

let usu2 = new Usuari({
    login: 'usuario',
    password: sha256('87654321')
});
usu2.save();

