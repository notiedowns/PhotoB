(function () {

    'use strict'

    var categoryController = function ($scope, categoryRepository, $location, $log, $exceptionHandler) {
        
        $scope.getCategories = function () {
            categoryRepository.getCategories().then(function (data) {
                $scope.categories = data;
            });
        };

        $scope.selectedCategory = null;

        $scope.createCategory = function (category) {
            categoryRepository.createCategory(category).then(
                onCreateCategorySuccess,
                onCreateCategoryError
                );
        };

        function onCreateCategorySuccess(response) {
            $log.info('New category created');
            $location.path('/CategoryList');
        }

        function onCreateCategoryError(response) {
            $log.info('Validation errors found');

            if (response && response.data) {
                createErrorMessage(response.data);
            } else {
                $exceptionHandler('Something went wrong');
            }
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

    angular.module('adminModule').controller("CategoryController", ["$scope", "categoryRepository", "$location", "$log", "$exceptionHandler", categoryController]);

})();