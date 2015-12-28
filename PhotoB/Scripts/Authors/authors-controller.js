'use strict'

shopModule.controller("AuthorsController", function ($scope, bootstrappedData) {
    $scope.authors = bootstrappedData.authors;
});