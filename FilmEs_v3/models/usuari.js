const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login:{
        required:true,
        type:String,
        minlenght:5,
        unique:true
    },
    password:{
        required:true,
        type:String,
        minlength:8
    }
});

let Usuario = mongoose.model('usuaris',usuarioSchema);

module.exports = Usuario;