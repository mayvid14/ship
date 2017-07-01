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
    };
});