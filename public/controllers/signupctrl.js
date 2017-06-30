app.controller('signupctrl', ['$scope', '$window', '$sessionStorage', function ($scope, $window, $sessionStorage) {
    $scope.signup = function () {
        var fn = $scope.fn;
        var ln = $scope.ln;
        var email = $scope.semail;
        var passwd = $scope.spasswd;
        var bio = $scope.bio;
        var obj = {
            fn: fn
            , ln: ln
            , email: email
            , passwd: passwd
            , bio: bio
        };
        $sessionStorage.put('temp', obj);
        if ($sessionStorage.get('temp')) {
            console.log('written');
            $window.location.href = './imgup';
        }
    };
}]);