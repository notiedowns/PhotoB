(function () {

    angular.module('shopModule').factory('photoRepository', function ($http) {

        return {
            get: function () {
                return $http.get('/Photo/GetPhotos');
            },

            createPhoto: function (photo) {
                return $http.post('/Photo/CreatePhoto', photo);
            }
        }
    });

})();