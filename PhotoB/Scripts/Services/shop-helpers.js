
(function () {

    var shopHelperFunctions = function ($log, $exceptionHandler, alertService) {

        var handleErrorResponse = function (response, createErrorMessageFunction) {
            if (response && response.data) {
                if (response.data.exceptionMessage) {
                    $log.info(response.data.exceptionMessage);
                    alertService.showAlert(response.data.exceptionMessage);
                }
                else if (response.data.validationErrors) {
                    createErrorMessageFunction(response.data.validationErrors);
                    $log.info("Validation errors found");
                } else {
                    var defaultMessage = "Server communication error";
                    $log.info(defaultMessage);
                    $exceptionHandler(defaultMessage);
                    alertService.showAlert(defaultMessage);
                }
            }
        }

        return {
            handleErrorResponse: handleErrorResponse
        }
    }
    
    angular.module('shopModule').factory('shopHelperFunctions', shopHelperFunctions);

})();