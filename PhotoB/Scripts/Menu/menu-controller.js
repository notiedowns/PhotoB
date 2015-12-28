'use strict'

shopModule.controller("MenuController", function ($scope, menuRepository) {
    menuRepository.get().then(function (menuItems) {
        $scope.menuItems = menuItems
    });
});