app.factory('feedfac', function ($http, $q) {
    return {
        getposts: function () {
            var q = $q.defer();
            $http.post('/getposts').then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});