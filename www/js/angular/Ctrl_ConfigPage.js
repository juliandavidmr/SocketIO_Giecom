/**
 * Created by julian on 12/03/16.
 */

app.controller('AppController', ['$scope', function($scope, socket) {
    $scope.ip_route = 'http://localhost:';
    $scope.port = 3000;
    $scope.dir =  $scope.ip_route +  $scope.port;
}]);
