app.controller('indexctrl', ['$scope', '$sessionStorage', '$window', '$mdSidenav', '$mdDialog', 'indexfac', function ($scope, $sessionStorage, $window, $mdSidenav, $mdDialog, indexfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');

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
    $scope.$watch(function(){
        return $sessionStorage.get('user');
    },function(n,o,s){
        $scope.user = $sessionStorage.get('user');
    });
}]);