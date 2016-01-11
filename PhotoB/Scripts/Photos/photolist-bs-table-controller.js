(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, $log) {
        
        $scope.refreshPhotoList = function () {
            reloadProductData();
        };
    }




    angular.module('productModule').controller("PhotolistBSTableController", ["$scope", "photoRepository", "$log", photolistController]);

})();