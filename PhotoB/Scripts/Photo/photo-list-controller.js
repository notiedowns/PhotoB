(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, notificationService, shopHelperFunctions, $interval, $log, $location, $timeout) {
        
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
        $scope.sessionTimeoutSeconds = 60 * 5; //5 min        

        $scope.startSessionCountdown = function () {
            $interval(function () { $scope.sessionTimeoutSeconds -= 1 }, 1000, $scope.sessionTimeoutSeconds);
        }

        $scope.startSessionCountdown();



        // Delete selected photo
        $scope.confirmDeleteCategory = function (photoId) {
            bootbox.dialog({
                message: "Are you sure you want to delete this photo?",
                buttons: {
                    yes: {
                        label: "Yes",
                        className: "btn-primary btn-sm",
                        callback: function () {
                            $scope.deletePhoto(photoId);
                        }
                    },
                    cancel: {
                        label: "Cancel",
                        className: "btn-default btn-sm"
                    }
                }
            });
        };

        $scope.deletePhoto = function (photoId) {
            photoRepository.deletePhoto(photoId).then(
                onDeletePhotoSuccess,
                onDeletePhotoError
                );
        };
        function onDeletePhotoSuccess(response) {
            $log.info('Photo deleted');
            $scope.search();
        }
        function onDeletePhotoError(response) {
            shopHelperFunctions.handleErrorResponse(response);
        }



        // Handle category filter selection event
        $scope.$on('categoryFilterSelectedBroadcast', function () {
            $scope.selectedCategoryId = notificationService.categoryId;
            $scope.search();
        });



        // Add photo to cart
        $scope.addToCart = function (photoId) {
            notificationService.notifyPhotoAddedToCart(photoId);
        };
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotolistController", ["$scope", "photoRepository", "notificationService", "shopHelperFunctions", "$interval", "$log", "$location", "$timeout", photolistController]);

})();