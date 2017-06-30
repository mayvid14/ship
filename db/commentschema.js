var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var commentSchema = new object.mongoose.Schema({
    comment: {
        type: String
    }
    , createdOn: {
        type: Number
        , default: Date.now
    }
    , postId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
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
module.exports = object.db.model('comments', commentSchema);