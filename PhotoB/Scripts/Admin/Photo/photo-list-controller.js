﻿(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, photoCacheService, categoryBroadcaster, $interval, $log, $location, $timeout) {
        
        $scope.searchQuery = '';
        $scope.selectedCategoryId = '';
        $scope.productSortOrder = '-dateListed';



        // Load photo list
        $scope.search = function () {
            photoRepository.getPhotos($scope.searchQuery, $scope.selectedCategoryId).then(function (data) {
                $scope.photos = data;
            });
        };



        // Handle search filter input
        var timeout;
        $scope.keyup = function () {
            timeout = $timeout(function () {
                $scope.search();
            }, 1000);
        };

        $scope.keydown = function () {
            $timeout.cancel(timeout);
        };

                

        // Session timeout indicator
        $scope.sessionTimeoutSeconds = 60 * 1; //1 min        

        $scope.startSessionCountdown = function () {
            $interval(function () { $scope.sessionTimeoutSeconds -= 1 }, 1000, $scope.sessionTimeoutSeconds);
        }

        $scope.startSessionCountdown();



        // Route to create photo view
        $scope.loadEditPhoto = function () {
            photoCacheService.storeSelectedPhoto(null);
            $location.path('/CreatePhoto');
        };

        // Cache selected photo for edit
        $scope.editPhoto = function (photoId) {

            for (var i = 0; i < $scope.photos.length; i++) {
                if ($scope.photos[i].id === photoId) {
                    photoCacheService.storeSelectedPhoto($scope.photos[i]);
                }
            }

            $location.path('/CreatePhoto');
        };



        // Delete selected photo
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



        // Handle category filter selection event
        $scope.$on('categoryFilterBroadcast', function () {
            $scope.selectedCategoryId = categoryBroadcaster.categoryId;
            $scope.search();
        });
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotolistController", ["$scope", "photoRepository", "photoCacheService", "categoryBroadcaster", "$interval", "$log", "$location", "$timeout", photolistController]);

})();