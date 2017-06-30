app.factory('loginfac', function ($http, $q) {
    return {
        getUser: function (em, pw) {
            var q = $q.defer();
            $http.post('/log', {
                em: em
                , pw: pw
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});