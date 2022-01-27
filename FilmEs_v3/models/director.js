const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
    nom:{
        required:true,
        type:String,
        minlenght:5
    },
    naixement:{
        required:false,
        type:Number
    }
});

let Director = mongoose.model('directors',directorSchema);

module.exports = Director;