(function () {

    'use strict'

    var photoController = function ($scope, photoRepository) {
        photoRepository.get().then(function (response) {
            $scope.photos = response.data;
        });


        $scope.createPhoto = function (photo) {
            $scope.errorMessage = '';
            photoRepository.createPhoto(photo).then(
                onCreatePhotoSuccess,
                onCreatePhotoError);
        };

        function onCreatePhotoSuccess(response) {
            window.location = '/Photo/PhotoList';
        }

        function onCreatePhotoError(response) {
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

    }

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    angular.module('shopModule').controller("PhotoController", ["$scope", "photoRepository", photoController]);

})();