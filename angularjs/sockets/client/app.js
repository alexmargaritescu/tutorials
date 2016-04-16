var myApp = angular.module('myApp', []);

myApp.controller('MyController', function ($scope) {
    $scope.demo = 'This is a demo';
    var ws = new WebSocket('ws://localhost:8080/events/');
    ws.onopen = function (event) {
        console.log(event);
        ws.send('hello');
    };
    ws.onmessage = function (event) {
        console.log(event.data);
        $scope.$apply(function() {
            $scope.demo = event.data;
        });
    };
});
