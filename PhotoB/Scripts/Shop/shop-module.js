(function () {

    var shopModule = angular.module("shopModule", ['ngRoute', 'bsTable'])

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/ProductStart", {
                templateUrl: "/templates/product/product-list.html"
                //controller: "PhotoCreateController"
            })
            .when("/CategoryList", {
                templateUrl: "/templates/admin/category/category-list.html",
                controller: "CategoryController"
            })
            .when("/CreateCategory", {
                templateUrl: "/templates/admin/category/category-create.html",
                controller: "CategoryController"
            })
            .when("/PhotoList", {
                templateUrl: "/templates/admin/photo/photo-list.html",
                controller: "PhotolistController"
            })
            .when("/CreatePhoto", {
                templateUrl: "/templates/admin/photo/photo-create.html",
                controller: "PhotoCreateController"
            })
            .when("/BSTable", {
                templateUrl: "/templates/admin/photo/photo-bs-table.html",
                controller: "PhotolistBSTableController"
            })
            .when("/BSTableAngular", {
                templateUrl: "/templates/admin/photo/photo-bs-table-angular.html",
                controller: "PhotolistBSTableAngularController"
            })
            .when("/AdminStart#/CreateCategory", {
                templateUrl: "/templates/admin/category/category-create.html",
                controller: "CategoryController"
            })
        .otherwise({ redirectTo: "/ProductStart" });
    });


    shopModule.directive('sideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/side-navbar.html'
        };
    });

    shopModule.directive('adminSideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/admin-side-navbar.html'
        };
    });

})();