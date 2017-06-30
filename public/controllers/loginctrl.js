app.controller('loginctrl', ['$scope', '$sessionStorage', '$window', 'loginfac', function ($scope, $sessionStorage, $window, loginfac) {
    $scope.lemail = '';
    $scope.lpasswd = '';
    $scope.msg = '';
    $scope.login = function () {
        var email = $scope.lemail;
        var passwd = $scope.lpasswd;
        var promise = loginfac.getUser(email, passwd);
        promise.then(function (data) {
            if (data.data === "Incorrect email") alert('Incorrect Email');
            else if (data.data === "Incorrect password") alert('Incorrect password');
            else {
                $sessionStorage.put('user', data.data.user);
                $window.location.href = '/';
            }
        }, function (error) {
            console.log(error);
        });
    };
}]);