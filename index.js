var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').Server(app);
var urlenc = bodyParser.urlencoded({
    extended: false
});
var jsonenc = bodyParser.json();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('client-sessions');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nm', express.static(path.join(__dirname, 'node_modules')));
app.get('/', jsonenc, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});
app.use(session({
    cookieName: 'session'
    , secret: 'appearances are deceiving'
    , duration: 90 * 60 * 1000
    , activeDuration: 15 * 60 * 1000
, }));
app.get('/user', urlenc, function (req, res) {
    var shash = "";
    bcrypt.hash('password', saltRounds, function (err, hash) {
        shash = hash;
        bcrypt.compare(req.query.pwd, shash, function (err, resp) {
            if (resp) {
                req.session.user = {
                    'name': req.query.user
                };
                res.send('Welcome ' + req.query.user);
            }
            else {
                res.send({
                    'message': 'Not successful'
                });
            }
        });
    });
});
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});
app.get('/post',function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'views', 'post.html'));
});
app.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'views', 'profile.html'));
});
app.get('/imgup',function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'views', 'imgup.html'));
});
app.use(function (req, res, next) {
    if (req.session && req.session.user) {
        //req.user = user;
        //delete req.user.password; // delete the password from the session
        //req.session.user = user; //refresh the session value
        res.locals.user = req.session.user;
        next();
    }
    else {
        next();
    }
});

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
app.post('/d', function (req, res) {
    res.send('Welcome ' + res.locals.user.name);
});
app.listen(8080, function () {
    console.log('Connected to 8080');
});