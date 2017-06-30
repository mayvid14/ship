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
    , postfav: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
    }]
    , postsad: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
    }]
    , comfav: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'comments'
    }]
    , comsad: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'comments'
    }]
    , dp: {
        type: String
    }
});
module.exports = object.db.model('users', userSchema);