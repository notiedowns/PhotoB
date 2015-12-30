(function () {

    var shopModule = angular.module("shopModule", ['ngRoute'])

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/PhotoList", {
                templateUrl: "/templates/photoListDetails.html",
                controller: "PhotolistController"
            })
            .when("/CreatePhoto", {
                templateUrl: "/templates/createPhotoDetails.html",
                controller: "PhotoCreateController"
            })
        .otherwise({ redirectTo: "/Start" });
    });

})();