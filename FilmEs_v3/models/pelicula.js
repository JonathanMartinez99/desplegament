const mongoose = require('mongoose');

let plataformaSchema = new mongoose.Schema({
    nom:{
        required:true,
        type:String,
        minlength:2
    },
    data:{
        required:false,
        type:Date
    },
    quantitat:{
        type:Boolean,
        default:false
    }
});

let peliculaSchema = new mongoose.Schema({
    titol:{
        required:true,
        type:String,
        minlenght:2
    },
    sinopsi:{
        required:true,
        type:String,
        minlength:10
    },
    duracio:{
        required:true,
        type:Number,
        min:0
    },
    genere:{
        required:true,
        type:String,
        enum:['comedia','terror','drama','aventures','altres']
    },
    imatge:{
        required:false,
        type:String
    },
    valoracio:{
        required:true,
        type:Number,
        min:0,
        max:5
    },
    plataforma:[plataformaSchema],
    director:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'directors'
    }
});

let Pelicula = mongoose.model('peliculas',peliculaSchema);
module.exports = Pelicula;