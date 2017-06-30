app.factory('indexfac', function ($http, $q) {
    return {
        logout: function () {
            var q = $q.defer();
            $http.post('/logout').then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , getposts: function () {
            var q = $q.defer();
            $http.post('/getposts').then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , openpost: function (pid) {
            var q = $q.defer();
            $http.get('/post', {
                params: {
                    "id": pid
                }
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});