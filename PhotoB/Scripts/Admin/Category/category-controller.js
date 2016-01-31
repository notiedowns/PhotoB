(function () {

    'use strict'

    var categoryController = function ($scope, categoryRepository, categoryCacheService, $location, $log, $exceptionHandler) {
        
        // Set selected category if it exists
        $scope.selectedCategory = categoryCacheService.loadSelectedCategory();

        if ($scope.selectedCategory) {
            $scope.editCategoryTitle = "Edit Category";
        }
        else {
            $scope.editCategoryTitle = "Create Category";
        }


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
            if (response && response.data) {
                if (response.data.exceptionMessage) {
                    alert(response.data.exceptionMessage);
                    $log.info(response.data.exceptionMessage);
                }
                else if (response.data.validationErrors) {
                    createErrorMessage(response.data.validationErrors);
                    $log.info("Validation errors found");
                } else {
                    var defaultMessage = "Server communication error";
                    $exceptionHandler(defaultMessage);
                    $log.info(defaultMessage);
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

        
        $scope.loadEditCategory = function () {
            categoryCacheService.storeSelectedCategory(null);
             
            $location.path('/CreateCategory');
        };


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
                onDeleteCategoryError
                );
        };

        function onDeleteCategorySuccess(response) {
            $log.info('Category deleted');
            $scope.getCategories();
        }

        function onDeleteCategoryError(response) {
            $log.info('Error deleting category');
            alert('Error deleting category');
        }
    }

    angular.module('shopModule').controller("CategoryController", ["$scope", "categoryRepository", "categoryCacheService", "$location", "$log", "$exceptionHandler", categoryController]);

})();