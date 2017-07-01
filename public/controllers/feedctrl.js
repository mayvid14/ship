app.controller('feedctrl', ['$scope', '$sessionStorage', '$window', '$mdSidenav', '$mdDialog', 'feedfac', function ($scope, $sessionStorage, $window, $mdSidenav, $mdDialog, feedfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    feedfac.getposts().then(function (data) {
        $scope.posts = data.data;
    }, function (err) {
        alert('error : ' + err);
    });

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID).toggle();
        };
    }
    $scope.toggle = buildToggler('left');
    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController
            , templateUrl: '../views/dialog1.tmpl.html'            
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (ans) {
            feedfac.getposts().then(function (data) {
                $scope.posts = data.data;
            }, function (err) {
                alert('error : ' + err);
            });
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.openpost = function(pid){
        $window.location.href="/#post/#"+pid;
    };
    function DialogController($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function (ans) {
            $mdDialog.hide(ans);
        };
        $scope.cancel = function(){
            $mdDialog.cancel();
        }
        $scope.user = $sessionStorage.get('user');
        $scope.postupload = function () {
            Upload.upload({
                url: '/newpost'
                , method: 'POST'
                , data: {
                    uid: $scope.user._id
                    , title: $scope.postTitle
                    , description: $scope.postDescription
                    , file: $scope.postPic
                }
            , }).then(function (response) {
                $scope.hide('yolo');
            }, function (response) {
                console.log('Failed', 3000);
            }, function (evt) {
                console.log('Uploading', 100);
            });
        };
    }
}]);