var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var userSchema = new object.mongoose.Schema({
    firstname: {
        type: String
        , required: true
    }
    , lastname: {
        type: String
        , required: true
    }
    , email: {
        type: String
        , required: true
        , unique: true
    }
    , passwd: {
        type: String
        , required: true
    }
    , bio: {
        type: String
    }
    , admin: {
        type: Boolean
        , default: false
    }
    , postfav: []
    , postsad: []
    , comfav: []
    , comsad: []
    , dp: {
        type: String
    }
});
module.exports = object.db.model('users', userSchema);