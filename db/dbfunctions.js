var ops = require('./ops');
var Promise = require('bluebird');
module.exports = {
    createUser: function (fn, ln, email, passwd, bio, picurl, res) {
        var p = ops.addANewUser(fn, ln, email, passwd, bio, picurl);
        p.then(function (data) {
            res.send({
                err: 0
            });
        }, function (err) {
            throw err;
        });
    }
    , getUserForLogin: function (em, pw, req, res, bcrypt) {
        //console.log(em,pw);
        var p = ops.getUserByEmail(em);
        p.then(function (data) {
            if (!data) {
                console.log(data);
                res.send('Incorrect email');
            }
            else {
                bcrypt.compare(pw, data.passwd, function (err, resp) {
                    if (resp) {
                        req.session.user = data;
                        res.send({
                            user: data
                        });
                    }
                    else {
                        res.send('Incorrect password');
                    }
                });
            }
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , findInSession: function (session, req, res, next) {
        ops.getUserByEmail(session.user.email).then(function (data) {
            if (data) {
                req.user = data;
                delete req.user.password; // delete the password from the session
                req.session.user = data; //refresh the session value
                res.locals.user = data;
            }
            // finishing processing the middleware and run the route
            next();
        }, function (err) {
            console.log(err);
        });
    }
    , newPost: function (uid, title, desc, url, res) {
        var p = ops.addPost(uid, title, desc, url);
        p.then(function (data) {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , getPost: function (res) {
        var p = ops.getPostsData();
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , postPage: function (id, res) {
        var a = ops.postPage(id);
        var b = a.then(function (pdata) {
            return ops.commentsOfPost(id);
        });
        return Promise.join(a, b, function (pdata, cdata) {
            res.send({
                pdata: pdata
                , cdata: cdata
            });
        });
    }
    , comment: function (uid, com, pid, res) {
        ops.addComment(uid, com, pid).then(function (data) {
            return ops.commentsOfPost(pid);
        }).then(function (newdata) {
            res.send(newdata);
        });
    }
    , profile: function (uid, res) {
        var a = ops.getUserById(uid);
        var b = a.then(function (udata) {
            return ops.getPostsByUserId(uid);
        });
        var c = b.then(function (pdata) {
            return ops.getCommentsByUserId(uid);
        });
        return Promise.join(a, b, c, function (udata, pdata, cdata) {
            res.send({
                udata: udata
                , pdata: pdata
                , cdata: cdata
            });
        });
    }
    , profup: function (fn, ln, bio, id, res) {
        ops.updateProfile(fn, ln, bio, id).then(function (data) {
            res.send(data);
        });
    }
    , uvpost: function (uid, pid, res) {
        var a = ops.upvotepost(uid, pid);
        var c = a.then(function (pdata) {
            return ops.adduvpostdata(pdata.userId, uid);
        });
        var b = c.then(function (ndata) {
            return ops.commentsOfPost(pid);
        });
        return Promise.join(a, c, b, function (pdata, ndata, cdata) {
            res.send({
                pdata: pdata
                , cdata: cdata
            });
        });
    }
    , dvpost: function (uid, pid, res) {
        var a = ops.downvotepost(uid, pid);
        var c = a.then(function (pdata) {
            return ops.adddownpostdata(pdata.userId, uid);
        });
        var b = c.then(function (ndata) {
            return ops.commentsOfPost(pid);
        });
        return Promise.join(a, c, b, function (pdata, ndata, cdata) {
            res.send({
                pdata: pdata
                , cdata: cdata
            });
        });
    }
    , uvcomment: function (uid, pid, cid, res) {
        var a = ops.upvotecomment(uid, cid);
        var c = a.then(function (ctdata) {
            return ops.adduvcommentdata(ctdata.userId, uid);
        });
        var b = c.then(function (ndata) {
            return ops.commentsOfPost(pid);
        });
        return Promise.join(a, c, b, function (ctdata, ndata, cdata) {
            res.send({
                cdata: cdata
            });
        });
    }
    , dvcomment: function (uid, pid, cid, res) {
        var a = ops.downvotecomment(uid, cid);
        var c = a.then(function (ctdata) {
            return ops.adddowncommentdata(ctdata.userId, uid);
        });
        var b = c.then(function (ndata) {
            return ops.commentsOfPost(pid);
        });
        return Promise.join(a, c, b, function (ctdata, ndata, cdata) {
            res.send({
                cdata: cdata
            });
        });
    }
};