(function () {

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

        var getPhotoById = function (photoId) {
            return $http.get('/Photo/GetPhotoById', { params: { photoId: photoId } }).then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        return 'Error while getting photo by id';
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
            getPhotoById: getPhotoById,
            editPhoto: editPhoto,
            deletePhoto: deletePhoto
        }
    };


    angular.module('shopModule').factory('photoRepository', photoRepository);

})();