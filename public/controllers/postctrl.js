app.controller('postctrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', '$routeParams', 'postfac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, $routeParams, postfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    $scope.id = '';
    $scope.post = {};
    postfac.openpost($routeParams.pid).then(function (data) {
        $scope.post = data.data.pdata;
        $scope.comments = data.data.cdata;
        $scope.canEdit = _.isEqual($scope.user._id, $scope.post.userId._id);
    });
    $scope.canEditC = function (cid) {
        return _.isEqual(cid, $scope.user._id);
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
    $scope.uvpost = function () {
        var userid = $scope.user._id;
        var postid = $scope.post._id;
        postfac.uvpost(userid, postid).then(function (data) {
            $scope.post = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.uvpyet = function () {
        if (_.indexOf($scope.post.fav, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.dvpost = function () {
        var userid = $scope.user._id;
        var postid = $scope.post._id;
        postfac.dvpost(userid, postid).then(function (data) {
            $scope.post = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.dvpyet = function () {
        if (_.indexOf($scope.post.sad, $scope.user._id) >= 0) return 'md-icon-button md-accent';
        else return 'md-icon-button';
    }
    $scope.uvcomment = function (cid) {
        var userid = $scope.user._id;
        var postid = $scope.post._id;
        postfac.uvcomment(userid,postid, cid).then(function (data) {
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.uvcyet = function (carr) {
        if (_.indexOf(carr, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.dvcomment = function (cid) {
        var userid = $scope.user._id;
        var postid = $scope.post._id;
        postfac.dvcomment(userid,postid, cid).then(function (data) {
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.dvcyet = function (carr) {
        if (_.indexOf(carr, $scope.user._id) >= 0) return 'md-icon-button md-accent';
        else return 'md-icon-button';
    }
}]);