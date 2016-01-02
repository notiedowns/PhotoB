(function () {

    var photoRepository = function ($http) {

        var testphotos = { foo: 'bar' };

        var getPhotos = function () {
            //return testphotos;
            return $http.get('/Photo/GetPhotos').then(function (response) {
                return response.data;
            });
        };

        var createPhoto = function (photo) {
            return true;
            //return $http.post('/Photo/CreatePhoto', photo);
        };

        return {
            getPhotos: getPhotos,
            createPhoto: createPhoto
        }
    };


    angular.module('shopModule').factory('photoRepository', photoRepository);

})();