(function () {

    'use strict'

    var adminMenuController = function ($scope, adminMenuRepository) {
        adminMenuRepository.getAdminMenu().then(function (data) {
            $scope.menuItems = data;
        });
    };

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    angular.module('shopModule').controller("AdminMenuController", ["$scope", "adminMenuRepository", adminMenuController]);

})();