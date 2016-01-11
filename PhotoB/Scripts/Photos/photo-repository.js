(function () {

    var photoRepository = function ($http) {

        var getPhotos = function (query) {
            return $http({ url: '/Photo/GetPhotos', method: 'GET', params: { query: query }}).then(
                function (response) {
                    return response.data;
                },
                function () {
                    return 'Error while getting photo data';
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


    angular.module('productModule').factory('photoRepository', photoRepository);

})();