(function () {

    'use strict'

    var categoryEditController = function ($scope, $routeParams, categoryRepository, shopHelperFunctions, $location, $log, $exceptionHandler) {

        // Load selected category if an edit is requested
        $scope.categoryId = $routeParams.categoryId;
        $scope.editTitle = "Create Category";

        if ($scope.categoryId) {
            categoryRepository.getCategoryById($scope.categoryId).then(function (data) {
                $scope.selectedCategory = data;

                if ($scope.selectedCategory) {
                    $scope.editTitle = "Edit Category";
                }
            });
        }


        // Edit selected category
        $scope.editCategory = function () {
            categoryRepository.editCategory($scope.selectedCategory).then(
                onEditCategorySuccess,
                onEditCategoryError
                );
        };

        function onEditCategorySuccess(response) {
            $log.info('New category created');
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

    angular.module('shopModule').controller("CategoryEditController", ["$scope", "$routeParams", "categoryRepository", "shopHelperFunctions", "$location", "$log", "$exceptionHandler", categoryEditController]);

})();