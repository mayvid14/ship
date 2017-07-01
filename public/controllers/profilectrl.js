app.controller('profilectrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', '$routeParams', 'profilefac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, $routeParams, profilefac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    $scope.id = $routeParams.id;
    $scope.showEdit = (_.isEqual($scope.id,$scope.user._id));
    profilefac.getProfile($scope.id).then(function (data) {
        $scope.profile = data.data.udata;
        $scope.posts = data.data.pdata;
        $scope.comments = data.data.cdata;
    });
    $scope.showPrompt = function (ev) {
        $mdDialog.show({
            controller: Dialog2Controller
            , templateUrl: '../views/dialog2.tmpl.html'
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function () {
            $scope.user = $sessionStorage.get('user');
            profilefac.getProfile($scope.id).then(function (data) {
                $scope.profile = data.data.udata;
                $scope.posts = data.data.pdata;
                $scope.comments = data.data.cdata;
            });
            $scope.user = $sessionStorage.get('user');
        }, function () {
            console.log('yolo');
        });
    };

    function Dialog2Controller($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        }
        $scope.firstname = $sessionStorage.get('user').firstname;
        $scope.lastname = $sessionStorage.get('user').lastname;
        $scope.bio = $sessionStorage.get('user').bio;
        $scope.profup = function () {
            profilefac.updateProfile($scope.firstname, $scope.lastname, $scope.bio, $sessionStorage.get('user')._id).then(function (data) {
                $sessionStorage.put('user',data.data);
                $scope.hide();
            });
        };
    }
}]);