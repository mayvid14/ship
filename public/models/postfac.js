app.factory('postfac', function ($q, $http) {
    return {
        openpost: function (pid) {
            var q = $q.defer();
            $http.post('/post', {
                id: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , comment: function (uid, com, pid) {
            var q = $q.defer();
            $http.post('/comment', {
                uid: uid
                , com: com
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , uvpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/uvpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , dvpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/dvpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , uvcomment: function (uid, pid, cid) {
            var q = $q.defer();
            $http.post('/uvcomment', {
                uid: uid
                , pid: pid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , dvcomment: function (uid, pid, cid) {
            var q = $q.defer();
            $http.post('/dvcomment', {
                uid: uid
                , pid: pid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , upcom: function (cid, comment) {
            var q = $q.defer();
            $http.post('/updatecomment', {
                cid: cid
                , comment: comment
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});