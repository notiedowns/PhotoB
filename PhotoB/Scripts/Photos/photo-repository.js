(function () {

    var photoRepository = function ($http) {

        var getPhotos = function () {
            return $http.get('/Photo/GetPhotos').then(function (response) {
                return response.data;
            });
        };

        var createPhoto = function (photo) {
            return $http.post('/Photo/CreatePhoto', photo);
        };

        return {
            getPhotos: getPhotos,
            createPhoto: createPhoto
        }
    };


    angular.module('shopModule').factory('photoRepository', photoRepository);

})();