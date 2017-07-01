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
    };
});