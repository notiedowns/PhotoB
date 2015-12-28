
shopModule.factory('menuRepository', function ($http, $q) {
    return {
        get: function () {
            var deferred = $q.defer();
            $http.get('/Photo/GetMenu').success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
    }
});