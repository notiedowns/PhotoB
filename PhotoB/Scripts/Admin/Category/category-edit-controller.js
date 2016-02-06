(function () {

    'use strict'

    var categoryEditController = function ($scope, categoryRepository, categoryCacheService, $location, $log, $exceptionHandler) {

        // Set selected category if it exists
        $scope.selectedCategory = categoryCacheService.loadSelectedCategory();
        
        if ($scope.selectedCategory) {
            $scope.editTitle = "Edit Category";
        }
        else {
            $scope.editTitle = "Create Category";
        }


        $scope.createCategory = function () {
            categoryRepository.createCategory($scope.selectedCategory).then(
                onCreateCategorySuccess,
                onCreateCategoryError
                );
        };

        function onCreateCategorySuccess(response) {
            $log.info('New category created');

            categoryCacheService.storeSelectedCategory({});
            $location.path('/CategoryList');
        }

        function onCreateCategoryError(response) {
            if (response && response.data) {
                if (response.data.exceptionMessage) {
                    $log.info(response.data.exceptionMessage);
                    //alert(response.data.exceptionMessage);
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

    angular.module('shopModule').controller("CategoryEditController", ["$scope", "categoryRepository", "categoryCacheService", "$location", "$log", "$exceptionHandler", categoryEditController]);

})();