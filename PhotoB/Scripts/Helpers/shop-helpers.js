
(function () {

    var shopHelperFunctions = function ($log, $exceptionHandler) {

        var handleErrorResponse = function (response, createErrorMessageFunction) {
            if (response && response.data) {
                if (response.data.exceptionMessage) {
                    $log.info(response.data.exceptionMessage);
                    alert(response.data.exceptionMessage);
                }
                else if (response.data.validationErrors) {
                    createErrorMessageFunction(response.data.validationErrors);
                    $log.info("Validation errors found");
                } else {
                    var defaultMessage = "Server communication error";
                    $log.info(defaultMessage);
                    $exceptionHandler(defaultMessage);
                    alert(defaultMessage);
                }
            }
        }

        return {
            handleErrorResponse: handleErrorResponse
        }
    }
    
    angular.module('shopModule').factory('shopHelperFunctions', shopHelperFunctions);

})();