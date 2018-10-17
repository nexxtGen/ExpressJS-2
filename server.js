// vars section
var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var path = require('path');
var googleProfile = {};

app.set('view engine', 'pug'); //mówi , że będziemy używać Puga jako kreatora widoków
app.set('views','./views'); // mowi , że widoki (views) będziemy trzymać w katalogu /views.

// App section
app.use('/', function(req, res, next) {
    console.log('Sprawdzam czy user jest zalogowany');
    next();
});
app.use('/', function(req, res, next) {
    console.log('Jeśli tak- Sprawdzam jego poziom uprawnień i Przekierowywuję do panelu usera. Jeśli nie- wyswietlam stronę główną z form do zalogowania');
    next();
});

app.get('/', function (req, res) {
    res.render('index')
});

app.get('/auth/snowflakes.jpg', function (req, res) {
    const image = path.join(__dirname, 'views', 'snowflakes.jpg');
    res.sendFile(image);  
});

app.get('/auth/google', function (req, res) {
    console.log('hasło: ', req.query)
    if (req.query.password != '') {
        res.render('user-panel', {
            email: req.query.email,
            pass: req.query.password
        });
    } else {
        res.send('Wróc i podaj nam swoje hasło.');
    }
    
});

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;    

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Nic nie znaleziono!');
});







