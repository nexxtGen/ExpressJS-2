// vars section
var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs');

app.set('view engine', 'pug'); //mówi , że będziemy używać Puga jako kreatora widoków
app.set('views','./views'); // mowi , że widoki (views) będziemy trzymać w katalogu /views.

// App section
app.use('/store', function(req, res, next) {
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});





var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;    

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Nic nie znaleziono!');
});







