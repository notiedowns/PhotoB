(function () {

    'use strict';

    var categoryListController = function ($scope, categoryRepository, shopHelperFunctions, $location, $log) {
        
        $scope.getCategories = function () {
            categoryRepository.getCategories().then(function (data) {
                $scope.categories = data;
            });
        };



        $scope.confirmDeleteCategory = function (categoryId) {
            bootbox.dialog({
                message: "Are you sure you want to delete this category?",
                buttons: {
                    yes: {
                        label: "Yes",
                        className: "btn-primary btn-sm",
                        callback: function () {
                            $scope.deleteCategory(categoryId);
                        }
                    },
                    cancel: {
                        label: "Cancel",
                        className: "btn-default btn-sm"
                    }
                }
            });
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
            shopHelperFunctions.handleErrorResponse(response);
        }        
    }

    angular.module('shopModule').controller("CategoryListController", ["$scope", "categoryRepository", "shopHelperFunctions", "$location", "$log", categoryListController]);

})();