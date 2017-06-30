var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var postSchema = new object.mongoose.Schema({
    title: {
        type: String
        , required: true
    }
    , description: {
        type: String
        , required: true
    }
    , createdOn: {
        type: String
        , default: Date.now
    }
    , image: {
        type: String
        , default: ''
    }
    , userId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }
    , fav: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , sad: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
});
module.exports = object.db.model('posts', postSchema);