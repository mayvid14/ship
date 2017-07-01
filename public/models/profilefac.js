app.factory('profilefac', function ($q, $http) {
    return {
        getProfile: function (uid) {
            var q = $q.defer();
            $http.post('/profile', {
                uid: uid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , updateProfile: function (fn, ln, bio, id) {
            var q = $q.defer();
            $http.post('/profup', {
                id: id
                , fn: fn
                , ln: ln
                , bio: bio
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});