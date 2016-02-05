(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, photoCacheService, categoryBroadcaster, $interval, $log, $location, $timeout) {
        
        $scope.$on('handleBroadcast', function () {
            $scope.categoryId = categoryBroadcaster.categoryId;
            $scope.search();
        });

        $scope.query = '';
        $scope.categoryId = '';

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
                photoRepository.getPhotos($scope.query, $scope.categoryId).then(function (data) {
                    $scope.photos = data;
            });
        };

        $scope.productSortOrder = '-dateListed';
        $scope.sessionTimeoutSeconds = 60 * 1; //1 min        

        $scope.startSessionCountdown = function () {
            $interval(function () { $scope.sessionTimeoutSeconds -= 1 }, 1000, $scope.sessionTimeoutSeconds);
        }

        $scope.startSessionCountdown();


        $scope.loadEditPhoto = function () {
            photoCacheService.storeSelectedPhoto(null);
            $location.path('/CreatePhoto');
        };


        $scope.editPhoto = function (photoId) {

            for (var i = 0; i < $scope.photos.length; i++) {
                if ($scope.photos[i].id === photoId) {
                    photoCacheService.storeSelectedPhoto($scope.photos[i]);
                }
            }

            $location.path('/CreatePhoto');
        };


        $scope.deletePhoto = function (photoId) {
            photoRepository.deletePhoto(photoId).then(
                onDeletePhotoSuccess,
                onDeletePhotoError
                );
        };

        function onDeletePhotoSuccess(response) {
            $log.info('Photo deleted');
            $scope.getPhotos();
        }

        function onDeletePhotoError(response) {
            $log.info('Error deleting photo');
            alert('Error deleting photo');
        }
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotolistController", ["$scope", "photoRepository", "photoCacheService", "categoryBroadcaster", "$interval", "$log", "$location", "$timeout", photolistController]);

})();