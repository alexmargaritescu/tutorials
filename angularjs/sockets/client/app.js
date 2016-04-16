var myApp = angular.module('myApp', []);

myApp.controller('MyController', function ($scope, SocketInterface) {
    $scope.demo = 'This is a demo';
    $scope.socket = new SocketInterface($scope, 'ws://localhost:8080/events/');
    $scope.socket.onOpen(function(event) {
        console.log(event);
        $scope.socket.sendMessage('hello');
    });
    $scope.socket.onMessage(function(event) {
        $scope.demo = event.data;
    });
});


myApp.factory('SocketInterface', function () {
    var scope;
    var socket;
    function Socket($scope, uri) {
        scope = $scope;
        socket = new WebSocket(uri);
        console.log("Socket created: " + socket);
    }
    Socket.prototype.onOpen = function(callback) {
        socket.onopen = function(event) {
            var args = arguments;
            scope.$apply(function () {
                callback.apply(socket, args);
            });
        };
    };
    Socket.prototype.onMessage = function (callback) {
        socket.onmessage = function(event) {
            var args = arguments;
            scope.$apply(function () {
                callback.apply(socket, args);
            });
        };
    };
    Socket.prototype.sendMessage = function (message) {
        socket.send(message);
    };
    return Socket;
});
