(function () {

    'use strict'

    var categoryController = function ($scope, categoryRepository, $log) {
        
        $scope.getCategories = function () {
            categoryRepository.getCategories().then(function (data) {
                $scope.categories = data;
            });
        };
    }

    angular.module('adminModule').controller("CategoryController", ["$scope", "categoryRepository", "$log", categoryController]);

})();