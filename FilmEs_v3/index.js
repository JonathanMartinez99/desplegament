const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const session = require('express-session');
const methodOverride = require('method-override');


const enrutadorPublico = require(__dirname + '/routes/public');
const enrutadorPelicula = require(__dirname + '/routes/pelicules');
const enrutadorDirector = require(__dirname + '/routes/directors');
const enrutadorUsuario = require(__dirname + '/routes/auth');
   

mongoose.connect('mongodb://localhost:27017/filmes');


let app = express();

nunjucks.configure('views', {
    autoescape:true,
    express:app
});

app.set('view engine', 'njk');


app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object'
    && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
    }
}));


app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', enrutadorPublico);
app.use('/pelicules', enrutadorPelicula);
app.use('/directors', enrutadorDirector);
app.use('/', enrutadorUsuario);

   

app.listen(8080);