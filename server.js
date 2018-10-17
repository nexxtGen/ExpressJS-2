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
app.use(passport.initialize());
app.use(passport.session());


// Passport config
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });


//
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
    googleProfile = {
        id: profile.id,
        displayName: profile.displayName
    };
    cb(null, profile);
}
));

//app routes
app.get('/', function(req, res){
    res.render('index', { user: req.user });
});


app.get('/logged', function(req, res){
    res.render('user-panel', { user: googleProfile, userName: googleProfile.displayName });
    console.log('uzytkownik:', googleProfile.displayName);
});

app.get('/snowflakes.jpg', function (req, res) {
    const image = path.join(__dirname, 'views', 'snowflakes.jpg');
    res.sendFile(image);  
});

//Passport routes
app.get('/auth/google',
passport.authenticate('google', {
scope : ['profile', 'email']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;    

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Nic nie znaleziono!');
});







