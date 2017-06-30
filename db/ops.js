var users = require('./userschema');
var posts = require('./postschema');
var comments = require('./commentschema');
module.exports = {
    addANewUser: function (fn, ln, email, passwd, bio, picurl) {
        var user = new users({
            firstname: fn
            , lastname: ln
            , email: email
            , passwd: passwd
            , bio: bio
            , dp: picurl
            , postfav: []
            , postsad: []
            , comfav: []
            , comsad: []
        });
        return user.save();
    }
    , getUserByEmail: function (em) {
        return users.findOne({
            email: em
        }).exec();
    }
    , addPost: function (uid, title, desc, url) {
        var post = new posts({
            title: title
            , description: desc
            , image: url
            , userId: uid
            , fav: []
            , sad: []
        });
        return post.save();
    }
    , getPostsData: function () {
        return posts.find().populate('userId', 'dp firstname lastname _id').exec();
    }
    , postPage: function (id) {
        return posts.findOne({
            _id: id
        }).populate('userId', 'dp firstname lastname _id').exec();
    }
    , commentsOfPost: function (id) {
        return comments.find({
            postId: id
        }).populate('userId', 'dp firstname lastname _id').exec();
    }
};