app.controller('indexctrl', ['$scope', '$sessionStorage', '$window', '$mdSidenav', '$mdDialog', 'indexfac', function ($scope, $sessionStorage, $window, $mdSidenav, $mdDialog, indexfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    indexfac.getposts().then(function (data) {
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
                /*, parent: angular.element(document.body)*/
                
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (ans) {
            indexfac.getposts().then(function (data) {
                $scope.posts = data.data;
            }, function (err) {
                alert('error : ' + err);
            });
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.logout = function () {
        indexfac.logout().then(function (data) {
            $sessionStorage.empty();
            $window.location.href = '/login';
        }, function (err) {
            console.log(err);
        });
    };
    $scope.openpost = function(pid){
        $window.location.href="/post/"+pid;
        /*indexfac.openpost(pid).then(function(data){
            $sessionStorage.put('temppost',data.data);
            $window.location.href="/post";
        });  */
    };
    function DialogController($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function (ans) {
            $mdDialog.hide(ans);
        };
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