(function () {

    var shopModule = angular.module("shopModule", ['ngRoute'])

    shopModule.config(function ($routeProvider) {

        $routeProvider
            .when("/PhotoList", {
                templateUrl: "/templates/photoListDetails.html",
                controller: "PhotoController"
            })
            .when("/CreatePhoto", {
                templateUrl: "/templates/createPhotoDetails.html",
                controller: "PhotoController"
            })
        .otherwise({ redirectTo: "/Start" });
    });

})();