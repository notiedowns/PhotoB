(function () {

    'use strict'

    var photoCreateController = function ($scope, photoRepository, $location, $log) {

        $scope.createPhoto = function (photo) {            

            photoRepository.createPhoto(photo).then(
                onCreatePhotoSuccess,
                onCreatePhotoError);
        };

        function onCreatePhotoSuccess(response) {
            $log.info('New photo created');
            $location.path('/PhotoList');
        }

        function onCreatePhotoError(response) {
            $log.info('Validation errors found');
            createErrorMessage(response.data);
        }

        function createErrorMessage(errorMessages) {
            if (errorMessages) {
                if (errorMessages.length > 0) {

                    // Clear all previous validation errors
                    $scope.validationErrors = {};

                    for (var i = 0; i < errorMessages.length; i++) {

                        var propertyName = errorMessages[i].key;

                        // Create property on scope if it doesn't already exist
                        if (!$scope.validationErrors[propertyName]) {
                            $scope.validationErrors[propertyName] = '';
                        }

                        // Add a comma if property already contains text
                        if ($scope.validationErrors[propertyName].length > 0) {
                            $scope.validationErrors[propertyName] += ', ';
                        }

                        $scope.validationErrors[propertyName] += errorMessages[i].value;
                    }
                }
            }
        }

    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.

    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotoCreateController", ["$scope", "photoRepository", "$location", "$log", photoCreateController]);

})();