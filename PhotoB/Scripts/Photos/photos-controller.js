(function () {

    'use strict'

    var photoController = function ($scope, photoRepository, $interval, $log) {
        photoRepository.getPhotos().then(function (data) {
            $scope.photos = data;
        });


        $scope.productSortOrder = '-dateListed';
        $scope.sessionTimeoutSeconds = 60 * 2; //20 min


        $scope.createPhoto = function (photo) {            
            $scope.errorMessage = '';
            photoRepository.createPhoto(photo).then(
                onCreatePhotoSuccess,
                onCreatePhotoError);
        };

        function onCreatePhotoSuccess(response) {
            $log.info('New photo created');
            window.location = '/Photo/PhotoList';
        }

        function onCreatePhotoError(response) {
            $log.info('Validation errors found');
            createErrorMessage(response.data);
        }

        function createErrorMessage(errorMessages) {
            if (errorMessages) {
                if (errorMessages.length > 0) {
                    for (var i = 0; i < errorMessages.length; i++) {
                        if ($scope.errorMessage.length > 0) {
                            $scope.errorMessage += '. ';
                        }

                        $scope.errorMessage += errorMessages[i].value;
                    }
                }
            }
        }

        var startSessionCountdown = function(){
            $interval(function () { $scope.sessionTimeoutSeconds -= 1 }, 1000, $scope.sessionTimeoutSeconds);
        }
        startSessionCountdown();
    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.

    // $interval is an angular service that can replace the standard js interval function. Using services like this as
    // dependancies means that modules and services are more testable (can replace with mock)
    angular.module('shopModule').controller("PhotoController", ["$scope", "photoRepository", "$interval", "$log", photoController]);

})();