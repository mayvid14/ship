var app = angular.module('ship', ['ngMaterial', 'ngSanitize', 'ngMessages', 'ngPassword', 'angularMoment', 'swxSessionStorage', 'ngFileUpload', 'ngImgCrop', 'ngRoute']);
app.filter('initcap', function () {
    return function (name) {
        var arr = name.split(' ');
        var dup = [];
        for (var i = 0; i < arr.length; i++) {
            var tempstr = arr[i];
            var str = tempstr[0].toUpperCase() + tempstr.substring(1, tempstr.length).toLowerCase();
            dup.push(str);
        }
        return dup.join(' ');
    };
});
app.filter('dob', function () {
    return function (num) {
        var date = new Date(num * 1);
        return date.toLocaleDateString();
    }
});
app.filter('getDur', function () {
    return function (num) {
        var date = new Date(num * 1);
        return moment(date).fromNow();
    }
});
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.definePalette('black', {
        '50': '000000'
        , '100': '000000'
        , '200': '000000'
        , '300': '000000'
        , '400': '000000'
        , '500': '000000'
        , '600': '000000'
        , '700': '000000'
        , '800': '000000'
        , '900': '000000'
        , 'A100': '000000'
        , 'A200': '000000'
        , 'A400': '000000'
        , 'A700': '000000'
        , 'contrastDefaultColor': 'light'
    });
    $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('teal',{
        'default':'700'
    });
});