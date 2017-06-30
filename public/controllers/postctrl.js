app.controller('postctrl', ['$scope', '$sessionStorage','$location', '$window', '$mdSidenav', '$mdDialog', 'postfac', function ($scope, $sessionStorage,$location, $window, $mdSidenav, $mdDialog, postfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    console.log($location.search().id);

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID).toggle();
        };
    }
    $scope.toggle = buildToggler('left');
    $scope.logout = function () {
        indexfac.logout().then(function (data) {
            $sessionStorage.empty();
            $window.location.href = '/login';
        }, function (err) {
            console.log(err);
        });
    };
}]);