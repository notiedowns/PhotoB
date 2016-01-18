(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, $log) {
        
        $scope.refreshPhotoList = function () {
            reloadProductData();
        };
    }




    angular.module('adminModule').controller("PhotolistBSTableController", ["$scope", "photoRepository", "$log", photolistController]);

})();