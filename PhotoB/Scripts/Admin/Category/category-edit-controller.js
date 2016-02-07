(function () {

    'use strict'

    var categoryEditController = function ($scope, categoryRepository, categoryCacheService, shopHelperFunctions, $location, $log, $exceptionHandler) {

        // Set selected category if it exists
        $scope.selectedCategory = categoryCacheService.loadSelectedCategory();
        
        if ($scope.selectedCategory) {
            $scope.editTitle = "Edit Category";
        }
        else {
            $scope.editTitle = "Create Category";
        }


        $scope.editCategory = function () {
            categoryRepository.editCategory($scope.selectedCategory).then(
                onEditCategorySuccess,
                onEditCategoryError
                );
        };

        function onEditCategorySuccess(response) {
            $log.info('New category created');

            categoryCacheService.storeSelectedCategory({});
            $location.path('/CategoryList');
        }

        function onEditCategoryError(response) {
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

    angular.module('shopModule').controller("CategoryEditController", ["$scope", "categoryRepository", "categoryCacheService", "shopHelperFunctions", "$location", "$log", "$exceptionHandler", categoryEditController]);

})();