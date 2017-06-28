var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').Server(app);
var urlenc = bodyParser.urlencoded({
    extended: false
});
var jsonenc = bodyParser.json();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nm', express.static(path.join(__dirname, 'node_modules')));
app.get('/', jsonenc, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});
app.get('/user', urlenc, function (req, res) {
    res.send('Welcome ' + req.query.user);
});
app.listen(8080, function () {
    console.log('Connected to 8080');
});