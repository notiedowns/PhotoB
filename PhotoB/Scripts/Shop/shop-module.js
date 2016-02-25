(function () {

    var shopModule = angular.module("shopModule", ['ngRoute']);

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/ProductList", {
                templateUrl: "/templates/product/product-list.html",
                controller: "PhotolistController"
            })
            .when("/CategoryList", {
                templateUrl: "/templates/admin/category/category-list.html",
                controller: "CategoryListController"
            })
            .when("/EditCategory/:categoryId", {
                templateUrl: "/templates/admin/category/category-edit.html",
                controller: "CategoryEditController"
            })
            .when("/EditCategory", {
                templateUrl: "/templates/admin/category/category-edit.html",
                controller: "CategoryEditController"
            })
            .when("/PhotoList", {
                templateUrl: "/templates/admin/photo/photo-list.html",
                controller: "PhotolistController"
            })
            .when("/EditPhoto/:photoId", {
                templateUrl: "/templates/admin/photo/photo-edit.html",
                controller: "PhotoCreateController"
            })
            .when("/EditPhoto", {
                templateUrl: "/templates/admin/photo/photo-edit.html",
                controller: "PhotoCreateController"
            })
            .when("/BSTable", {
                templateUrl: "/templates/admin/photo/photo-bs-table.html",
                controller: "PhotolistBSTableController"
            })
            .when("/AdminStart#/EditCategory", {
                templateUrl: "/templates/admin/category/category-create.html",
                controller: "CategoryEditController"
            })
            .when("/Cart", {
                templateUrl: "/templates/checkout/cart-list.html",
                controller: "CartController"
            })
            .when("/CartCustomerAddress", {
                templateUrl: "/templates/checkout/cart-customer-address.html",
                controller: "CartController"
            })
            .when("/CartCustomerPaymentMethod", {
                templateUrl: "/templates/checkout/cart-customer-paymentmethod.html",
                controller: "CartController"
            });

    });


    shopModule.directive('categorySideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/category-side-navbar.html'
        };
    });

    shopModule.directive('adminSideNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/Templates/nav/admin-side-navbar.html'
        };
    });

})();