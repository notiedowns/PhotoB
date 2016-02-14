(function () {

    'use strict'

    var photoCreateController = function ($scope, $routeParams, photoRepository, categoryRepository, shopHelperFunctions, $exceptionHandler, $location, $log) {
        
        // Load selected photo if an edit is requested
        $scope.photoId = $routeParams.photoId;
        $scope.editTitle = "Create Photo";

        if ($scope.photoId) {
            photoRepository.getPhotoById($scope.photoId).then(function (data) {
                $scope.selectedPhoto = data;

                if ($scope.selectedPhoto) {
                    $scope.editTitle = "Edit Photo";
                }

                // Load categories list and set selected category
                categoryRepository.getCategories().then(function (data) {
                    $scope.categories = data;

                    setSelectedCategory();
                });
            });
        }
        else
        {
            categoryRepository.getCategories().then(function (data) {
                $scope.categories = data;
            });
        }
        

        var setSelectedCategory = function () {
            if ($scope.selectedPhoto) {

                for (var i = 0; i < $scope.categories.length; i++) {
                    if ($scope.categories[i].id === $scope.selectedPhoto.categoryId) {
                        $scope.selectedCategory = $scope.categories[i];
                    }
                }
            }
        }


        // Select photo dialog
        $scope.openPhotoSelectionDialog = function () {
            photoRepository.getPhotoPaths().then(function (data) {
                $scope.images = data;
                $('#modalSelectPhoto').modal('show');
            });
            
        };

        $scope.closePhotoSelectionDialog = function () {
            $('#modalSelectPhoto').modal('hide');
        };


        // Edit photo
        $scope.editPhoto = function () {

            if ($scope.selectedCategory) {
                $scope.selectedPhoto.categoryId = $scope.selectedCategory.id;
            }

            photoRepository.editPhoto($scope.selectedPhoto).then(
                onEditPhotoSuccess,
                onEditPhotoError
                );
        };

        function onEditPhotoSuccess(response) {
            $log.info('New photo created');
            $location.path('/PhotoList');
        }

        function onEditPhotoError(response) {
            shopHelperFunctions.handleErrorResponse(response, createErrorMessage);
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
    angular.module('shopModule').controller("PhotoCreateController", ["$scope", "$routeParams", "photoRepository", "categoryRepository", "shopHelperFunctions", "$exceptionHandler", "$location", "$log", photoCreateController]);

})();