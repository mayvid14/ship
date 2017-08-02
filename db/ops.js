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
    , upvotepost: function (uid, pid) {
        return posts.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                fav: uid
            }
        }, {
            new: true
        }).exec();
    }
    , adduvpostdata: function (puid, uid) {
        return users.findOneAndUpdate({
            _id: puid
        }, {
            $addToSet: {
                postfav: uid
            }
        }, {
            new: true
        }).exec();
    }
    , downvotepost: function (uid, pid) {
        return posts.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                sad: uid
            }
        }, {
            new: true
        }).exec();
    }
    , adddownpostdata: function (puid, uid) {
        return users.findOneAndUpdate({
            _id: puid
        }, {
            $addToSet: {
                postsad: uid
            }
        }, {
            new: true
        }).exec();
    }
    , upvotecomment: function (uid, cid) {
        return comments.findOneAndUpdate({
            _id: cid
        }, {
            $addToSet: {
                fav: uid
            }
        }, {
            new: true
        }).exec();
    }
    , adduvcommentdata: function (cuid, uid) {
        return users.findOneAndUpdate({
            _id: cuid
        }, {
            $addToSet: {
                comfav: uid
            }
        }, {
            new: true
        }).exec();
    }
    , downvotecomment: function (uid, cid) {
        return comments.findOneAndUpdate({
            _id: cid
        }, {
            $addToSet: {
                sad: uid
            }
        }, {
            new: true
        }).exec();
    }
    , adddowncommentdata: function (cuid, uid) {
        return users.findOneAndUpdate({
            _id: cuid
        }, {
            $addToSet: {
                comsad: uid
            }
        }, {
            new: true
        }).exec();
    }
};