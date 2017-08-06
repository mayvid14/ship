app.controller('postctrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', '$routeParams', 'postfac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, $routeParams, postfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
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
        postfac.comment($scope.user._id, $scope.com, $routeParams.pid).then(function (data) {
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
        postfac.uvcomment(userid, postid, cid).then(function (data) {
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
        postfac.dvcomment(userid, postid, cid).then(function (data) {
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.dvcyet = function (carr) {
        if (_.indexOf(carr, $scope.user._id) >= 0) return 'md-icon-button md-accent';
        else return 'md-icon-button';
    }
    $scope.editPost = function (ev) {
        $sessionStorage.put('post', $scope.post);
        $mdDialog.show({
            controller: DialogController
            , templateUrl: '../views/dialog3.tmpl.html'
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (ans) {
            $sessionStorage.remove('post');
            postfac.openpost($routeParams.pid).then(function (data) {
                $scope.post = data.data.pdata;
                $scope.comments = data.data.cdata;
                $scope.canEdit = _.isEqual($scope.user._id, $scope.post.userId._id);
            });
        }, function () {
            console.log('nothing');
        });
    }
    $scope.updateComment = function (ev, cid, comment) {
        var confirm = $mdDialog.prompt().title('Edit your comment...').placeholder('What do you think?').ariaLabel('Comment').initialValue(comment).targetEvent(ev).ok('Submit').cancel('Cancel');
        $mdDialog.show(confirm).then(function (result) {
            if (result.trim().length > 0) {
                postfac.upcom(cid, result).then(function (data) {
                    $scope.comments = data.data.cdata;
                }, function (err) {
                    alert(err);
                });
            }
        }, function () {
            console.log('ok');
        });
    };

    function DialogController($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function (ans) {
            $mdDialog.hide(ans);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        }
        $scope.postId = $sessionStorage.get('post')._id;
        $scope.uppostTitle = $sessionStorage.get('post').title;
        $scope.uppostDescription = $sessionStorage.get('post').description;
        $scope.uppostPic = $sessionStorage.get('post').image;
        $scope.upuppost = function () {
            Upload.upload({
                url: '/updatepost'
                , method: 'POST'
                , data: {
                    pid: $scope.postId
                    , title: $scope.uppostTitle
                    , description: $scope.uppostDescription
                    , file: $scope.uppostPic
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