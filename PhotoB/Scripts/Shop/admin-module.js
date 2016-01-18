(function () {

    var adminModule = angular.module("adminModule", ['ngRoute', 'bsTable'])

    adminModule.config(function ($routeProvider) {

        $routeProvider
            .when("/CategoryList", {
                templateUrl: "/templates/admin/category/category-list.html",
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
        .otherwise({ redirectTo: "/CategoryList" });
    }); 


    adminModule.directive('adminSideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/admin-side-navbar.html'
        };
    });

})();