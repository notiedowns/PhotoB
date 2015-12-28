'use strict'

shopModule.controller("PhotosController", function ($scope, photoRepository) {
    photoRepository.get().then(function (photos) {
        $scope.photos = photos
    });

    $scope.createPhoto = function (photo) {
        $scope.errorMessage = '';
        photoRepository.createPhoto(photo).then(
            success,
            error);
    };

    function success(response) {
        window.location = '/Photo/PhotoList';
    }

    function error(response) {
        createFallbackErrorMessage(response.data);
    }

    function createFallbackErrorMessage(errorMessages) {
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

});


