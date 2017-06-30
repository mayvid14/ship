var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('./url');
var connect = mongoose.createConnection(db.dburl);
var obj = {
    db: connect
    , mongoose: mongoose
};
module.exports = obj;