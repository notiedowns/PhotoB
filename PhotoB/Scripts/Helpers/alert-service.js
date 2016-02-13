
(function () {

    var alertService = function () {

        var showAlert = function (message) {
            alert(message);
        }

        return {
            showAlert: showAlert
        }
    }

    angular.module('shopModule').factory('alertService', alertService);

})();