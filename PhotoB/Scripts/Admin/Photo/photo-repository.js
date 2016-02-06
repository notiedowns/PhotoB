﻿(function () {

    var photoRepository = function ($http) {

        var getPhotos = function (query, categoryId) {
            return $http({ url: '/Photo/GetPhotos', method: 'GET', params: { query: query, categoryId: categoryId } }).then(
                function (response) {
                    return response.data;
                },
                function () {
                    return 'Error while getting photo data';
                });
        };

        var editPhoto = function (photo) {
            return $http.post('/Photo/EditPhoto', photo);
        };

         var deletePhoto = function (photoId) {
             return $http.post('/Photo/DeletePhoto', { photoId: photoId });
        };

        return {
            getPhotos: getPhotos,
            editPhoto: editPhoto,
            deletePhoto: deletePhoto
        }
    };


    angular.module('shopModule').factory('photoRepository', photoRepository);

})();