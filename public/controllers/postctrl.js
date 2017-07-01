app.controller('postctrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', '$routeParams', 'postfac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, $routeParams, postfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    $scope.id = $routeParams.pid;
    $scope.post = {};
    postfac.openpost($scope.id).then(function (data) {
        $scope.post = data.data.pdata;
        $scope.comments = data.data.cdata;
        $scope.canEdit = _.isEqual($scope.user._id, $scope.post.userId._id);
    });
    $scope.canEditC = function(cid){
        return _.isEqual(cid,$scope.user._id);  
    };
    $scope.com = '';
    $scope.comment = function () {
        postfac.comment($scope.user._id, $scope.com, $scope.id).then(function (data) {
            $scope.comments = data.data;
            $scope.com = '';
        }, function (err) {
            alert(err);
        });
    };
    $scope.getClass = function (cid) {
        if (_.isEqual($routeParams.cid, cid)) return 'md-3-line md-long-text highlight';
        else return 'md-3-line md-long-text';
    }
}]);