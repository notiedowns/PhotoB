(function () {

    var shopModule = angular.module("shopModule", ['ngRoute'])

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/Start", {
                templateUrl: "/templates/photo/photo-list.html",
                controller: "PhotoCreateController"
            })
            .when("/PhotoList", {
                templateUrl: "/templates/photo/photo-list.html",
                controller: "PhotolistController"
            })
            .when("/CreatePhoto", {
                templateUrl: "/templates/photo/photo-create.html",
                controller: "PhotoCreateController"
            })
        .otherwise({ redirectTo: "/Start" });
    });


    shopModule.directive('sideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/side-navbar.html'
        };
    });

})();