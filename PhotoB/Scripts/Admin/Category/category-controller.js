(function () {

    'use strict'

    var categoryController = function ($scope, categoryRepository, categoryCacheService, $location, $log, $exceptionHandler) {
        
        // Set selected category if it exists
        $scope.selectedCategory = categoryCacheService.loadSelectedCategory();


        $scope.getCategories = function () {
            categoryRepository.getCategories().then(function (data) {
                $scope.categories = data;
            });
        };

        
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

        
        $scope.editCategory = function (categoryId) {

            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].id === categoryId) {
                    categoryCacheService.storeSelectedCategory($scope.categories[i]);
                }
            }

            $location.path('/CreateCategory');
        };


        $scope.deleteCategory = function (categoryId) {
            categoryRepository.deleteCategory(categoryId).then(
                onDeleteCategorySuccess,
                onCreateCategoryError
                );
        };

        function onDeleteCategorySuccess(response) {
            $log.info('Category deleted');
            $scope.getCategories();
        }

        function onCreateCategoryError(response) {
            $log.info('Error deleting category');
            alert('Error deleting category');
        }
    }

    angular.module('adminModule').controller("CategoryController", ["$scope", "categoryRepository", "categoryCacheService", "$location", "$log", "$exceptionHandler", categoryController]);

})();