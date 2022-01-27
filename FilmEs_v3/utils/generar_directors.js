const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');

mongoose.connect('mongodb://localhost:27017/filmes');

Director.collection.drop();

let dir1 = new Director({
    nom:"Martin Scorsese",
    naixement:1965
});
dir1.save();

let dir2 = new Director({
    nom:"Tim Burton",
    naixement:1975
});
dir2.save();

let dir3 = new Director({
    nom:"Steven Spielberg",
    naixement:1960
});
dir3.save();

let dir4 = new Director({
    nom:"Quentin Tarantino",
    naixement:1950
});
dir4.save();


