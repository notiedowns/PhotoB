(function () {

    var productModule = angular.module("productModule", ['ngRoute', 'bsTable'])

    productModule.config(function ($routeProvider) {

        $routeProvider
            .when("/Start", {
                templateUrl: "/templates/product/product-list.html"
                //controller: "PhotoCreateController"
            })            
        .otherwise({ redirectTo: "/Start" });
    });


    productModule.directive('sideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/side-navbar.html'
        };
    });

})();