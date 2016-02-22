(function () {

    'use strict';

    var menuController = function ($scope, menuRepository, notificationService) {

        menuRepository.getCategoryMenu().then(function (data) {
            $scope.categoryMenuItems = data;
        });

        menuRepository.getAdminMenu().then(function (data) {
            $scope.adminMenuItems = data;
        });

        $scope.filterByCategory = function (categoryId) {
            notificationService.notifyCategoryFilterSelected(categoryId);
        };
    };

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    angular.module('shopModule').controller("MenuController", ["$scope", "menuRepository", "notificationService", menuController]);

})();