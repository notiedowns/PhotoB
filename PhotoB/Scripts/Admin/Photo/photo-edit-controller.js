(function () {

    'use strict'

    var photoCreateController = function ($scope, photoRepository, categoryRepository, photoCacheService, $exceptionHandler, $location, $log) {
        
        categoryRepository.getCategories().then(function (data) {
            $scope.categories = data;
        });

        // Set selected category if it exists
        $scope.selectedPhoto = photoCacheService.loadSelectedPhoto();

        if ($scope.selectedPhoto) {
            $scope.editTitle = "Edit Photo";
        }
        else {
            $scope.editTitle = "Create Photo";
        }


        $scope.createPhoto = function () {
            photoRepository.createPhoto($scope.selectedPhoto).then(
                onCreatePhotoSuccess,
                onCreatePhotoError
                );
        };

        function onCreatePhotoSuccess(response) {
            $log.info('New photo created');

            photoCacheService.storeSelectedPhoto({});
            $location.path('/PhotoList');
        }

        function onCreatePhotoError(response) {
            if (response && response.data) {
                if (response.data.exceptionMessage) {
                    $log.info(response.data.exceptionMessage);
                    alert(response.data.exceptionMessage);
                }
                else if (response.data.validationErrors) {
                    createErrorMessage(response.data.validationErrors);
                    $log.info("Validation errors found");
                } else {
                    var defaultMessage = "Server communication error";
                    $log.info(defaultMessage);
                    $exceptionHandler(defaultMessage);
                    alert(defaultMessage);
                }
            }
        }

        function createErrorMessage(validationErrors) {
            if (validationErrors && validationErrors.length > 0) {
                // Clear all previous validation errors
                $scope.validationErrors = {};

                for (var i = 0; i < validationErrors.length; i++) {

                    var propertyName = validationErrors[i].Key;

                    // Create property on scope if it doesn't already exist
                    if (!$scope.validationErrors[propertyName]) {
                        $scope.validationErrors[propertyName] = '';
                    }

                    // Add a comma if property already contains text
                    if ($scope.validationErrors[propertyName].length > 0) {
                        $scope.validationErrors[propertyName] += ', ';
                    }

                    $scope.validationErrors[propertyName] += validationErrors[i].Value;
                }
            }
        }

    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotoCreateController", ["$scope", "photoRepository", "categoryRepository", "photoCacheService", "$exceptionHandler", "$location", "$log", photoCreateController]);

})();