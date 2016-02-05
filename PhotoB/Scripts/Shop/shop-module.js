(function () {

    var shopModule = angular.module("shopModule", ['ngRoute', 'bsTable'])

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/ProductStart", {
                templateUrl: "/templates/product/product-list.html",
                controller: "PhotolistController"
            })
            .when("/CategoryList", {
                templateUrl: "/templates/admin/category/category-list.html",
                controller: "CategoryListController"
            })
            .when("/CreateCategory", {
                templateUrl: "/templates/admin/category/category-create.html",
                controller: "CategoryEditController"
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
                controller: "CategoryEditController"
            })
        .otherwise({ redirectTo: "/ProductStart" });
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


    angular.module('shopModule').factory('mySharedService', function ($rootScope) {
        var sharedService = {};

        sharedService.message = '';

        sharedService.prepForBroadcast = function (msg) {
            this.message = msg;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function () {
            $rootScope.$broadcast('handleBroadcast');
        };

        return sharedService;
    });


    var ControllerZero = function ($scope, sharedService) {
        $scope.handleClick = function (msg) {
            sharedService.prepForBroadcast(msg);
        };

        $scope.$on('handleBroadcast', function () {
            $scope.message = sharedService.message;
        });
    }

    var ControllerOne = function ($scope, sharedService) {
        $scope.$on('handleBroadcast', function () {
            $scope.message = 'ONE: ' + sharedService.message;
        });
    }

    var ControllerTwo = function ($scope, sharedService) {
        $scope.$on('handleBroadcast', function () {
            $scope.message = 'TWO: ' + sharedService.message;
        });
    }

    angular.module('shopModule').controller("ControllerZero", ["$scope", "mySharedService", ControllerZero]);
    angular.module('shopModule').controller("ControllerOne", ["$scope", "mySharedService", ControllerOne]);
    angular.module('shopModule').controller("ControllerTwo", ["$scope", "mySharedService", ControllerTwo]);

})();