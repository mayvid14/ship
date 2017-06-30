app.controller('imgctrl', ['$scope', '$sessionStorage', '$window', 'Upload', '$timeout', function ($scope, $sessionStorage, $window, Upload, $timeout) {
    var user = $sessionStorage.get('temp');
    console.log(user);
    $scope.upl = function (dataUrl, name) {
        //console.log('gotcha');
        Upload.upload({
            url: '/add'
            , file: Upload.dataUrltoBlob(dataUrl, name)
            , data: user
            , method: 'POST'
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
                console.log('1');
                $sessionStorage.remove('temp');
                $window.location.href = './login';
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
            console.log('2');
            $window.location.href = './login';
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            console.log('3');
        });
    };
}]);