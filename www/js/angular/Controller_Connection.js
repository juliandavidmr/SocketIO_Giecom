/**
 * Created by julian on 10/03/16.
 */
//var app = angular.module('AppSocket',['btford.socket-io']);

/*
app.controller('AppController', ['$scope', function($scope, socket) {
   /* $scope.ip_route = 'http://localhost:';
    $scope.port = 3000;
    $scope.dir =  $scope.ip_route +  $scope.port;
    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });

    // Initial set of notes, loop through and add to list
    socket.on('initial notes', function(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            // We store html as a var then add to DOM after for efficiency
            html += '<li class=list-group-item >' + data[i].note + '</li>'
        }
        console.log("Hola:::::: " + html);
//        $('#notes').html(html)
    });
}]);
*/
/*
app.controller('SocketController', ['$scope', function($scope, socket) {

    // Socket listeners
    // ================

    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });

    socket.on('send:message', function (message) {
        $scope.messages.push(message);
    });

    socket.on('change:name', function (data) {
        changeName(data.oldName, data.newName);
    });

    socket.on('user:join', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
        $scope.users.push(data.name);
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if (user === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });

    // Private helpers
    // ===============

    var changeName = function (oldName, newName) {
        // rename user in list of users
        var i;
        for (i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i] === oldName) {
                $scope.users[i] = newName;
            }
        }

        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + oldName + ' is now known as ' + newName + '.'
        });
    }

    // Methods published to the scope
    // ==============================

    $scope.changeName = function () {
        socket.emit('change:name', {
            name: $scope.newName
        }, function (result) {
            if (!result) {
                alert('There was an error changing your name');
            } else {

                changeName($scope.name, $scope.newName);

                $scope.name = $scope.newName;
                $scope.newName = '';
            }
        });
    };

    $scope.sendMessage = function () {
        socket.emit('send:message', {
            message: $scope.message
        });

        // add the message to our model locally
        $scope.messages.push({
            user: $scope.name,
            text: $scope.message
        });

        // clear message box
        $scope.message = '';
    };
};*/