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
    , addComment: function (uid, com, pid) {
        var comment = new comments({
            comment: com
            , postId: pid
            , userId: uid
            , fav: []
            , sad: []
        });
        return comment.save();
    }
    , getUserById: function (uid) {
        return users.findOne({
            _id: uid
        }).exec();
    }
    , getPostsByUserId: function (uid) {
        return posts.find({
            userId: uid
        }).populate('userId', 'dp firstname lastname _id').exec();
    }
    , getCommentsByUserId: function (uid) {
        return comments.find({
            userId: uid
        }).populate('userId', 'dp firstname lastname _id').exec();
    }
    , updateProfile: function (fn, ln, bio, id) {
        return users.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                firstname: fn
                , lastname: ln
                , bio: bio
            }
        }, {
            new: true
        }).exec();
    }
};