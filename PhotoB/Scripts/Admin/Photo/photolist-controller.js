(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, $interval, $log, $timeout) {
        
        alert('photo list controller loaded');

        $scope.query = '';

        $scope.getPhotos = function () {
            photoRepository.getPhotos().then(function (data) {
                $scope.photos = data;
            });
        };

        var timeout;
        $scope.keyup = function () {
            timeout = $timeout(function () {
                $scope.search($scope.query);
            }, 1000);
        };

        $scope.keydown = function () {
            $timeout.cancel(timeout);
        };

        $scope.search = function () {
            photoRepository.getPhotos($scope.query).then(function (data) {
                $scope.photos = data;
            });
        };

        $scope.productSortOrder = '-dateListed';
        $scope.sessionTimeoutSeconds = 60 * 1; //1 min        

        $scope.startSessionCountdown = function () {
            $interval(function () { $scope.sessionTimeoutSeconds -= 1 }, 1000, $scope.sessionTimeoutSeconds);
        }

        $scope.startSessionCountdown();
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('adminModule').controller("PhotolistController", ["$scope", "photoRepository", "$interval", "$log", "$timeout", photolistController]);

})();