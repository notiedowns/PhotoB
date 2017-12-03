(function () {

    'use strict';

    var photolistController = function ($scope) {
        $scope.refreshPhotoList = function () {
            reloadProductData();
        };
    }

    angular.module('shopModule').controller("PhotolistBSTableController", ["$scope", photolistController]);

})();