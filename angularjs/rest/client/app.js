var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('MyController', function ($scope, userService) {  
    $scope.loading = true;
    userService.query().$promise.then(function(result) {
        $scope.loading = false;
        $scope.users = result;    
    });
    $scope.demo = 'This is a demo';
});

myApp.factory('userService', function($resource) {
    return $resource('/users/list/', {}, {});
});