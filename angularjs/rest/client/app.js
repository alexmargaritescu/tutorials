var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('MyController', function ($scope, userService) {
    $scope.users = userService.query();    
    $scope.demo = 'This is a demo';
});

myApp.factory('userService', function($resource) {
    return $resource('/users/list/', {}, {});
});
