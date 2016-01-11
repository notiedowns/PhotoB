(function () {

    'use strict'

    var menuController = function ($scope, menuRepository) {
        menuRepository.getMenu().then(function (data) {
            $scope.menuItems = data;
        });
    };

    // Pass in the names of the dependencies e.g. "$scope", so that a minifier can change the names in the controller
    // parameters without breaking dependecy injection.
    angular.module('productModule').controller("MenuController", ["$scope", "menuRepository", menuController]);

})();