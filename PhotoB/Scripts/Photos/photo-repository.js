
shopModule.factory('photoRepository', function ($http, $q) {

    return {
        get: function () {
            var deferred = $q.defer();
            $http.get('/Photo/GetPhotos').success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        },

        createPhoto: function (photo) {
            //var deferred = $q.defer();
            //$http.post('/Photo/CreatePhoto', photo).success(function () { deferred.resolve(); }).error(function () { deferred.reject(); });
            //return deferred.promise;

            return $http.post('/Photo/CreatePhoto', photo);
        }    
    }
});