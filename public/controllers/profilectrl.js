app.controller('profilectrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', 'profilefac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, profilefac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID).toggle();
        };
    }
    $scope.toggle = buildToggler('left');
    $scope.showPrompt = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt().title('What would you name your dog?').textContent('Bowser is a common name.').placeholder('Dog name').ariaLabel('Dog name').initialValue('Buddy').targetEvent(ev).ok('Okay!').cancel('I\'m a cat person');
        $mdDialog.show(confirm).then(function (result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function () {
            $scope.status = 'You didn\'t name your dog.';
        });
    };
    $scope.status = "";
}]);