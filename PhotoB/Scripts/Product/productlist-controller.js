(function () {

    'use strict'

    var productlistController = function ($scope, photoRepository, $log, $timeout) {
        
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
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    angular.module('productModule').controller("ProductlistController", ["$scope", "photoRepository", "$log", "$timeout", productlistController]);

})();