(function () {

    'use strict'

    var photolistController = function ($scope, photoRepository, $log) {

        $scope.refreshPhotoList = function () {
            $scope.bsTableControl = createBsTableControl();
        };

        $scope.bsTableControl = createBsTableControl();

        function createBsTableControl(){
            return{
                options: {
                    method: "get",
                    url: "/Photo/GetProductList",
                    cache: false,
                    striped: true,
                    search: false,
                    showRefresh: false,
                    clickToSelect: false,
                    pagination: true,
                    pageSize: 15,
                    classes: "table table-condensed table-hover",
                    idField: "ProductId",
                    columns: [
                        {
                            field: "Number",
                            title: "Number",
                            align: "left",
                            valign: "middle",
                            sortable: true
                        },
                        {
                            field: "Name",
                            title: "Name",
                            align: "left",
                            valign: "middle",
                            sortable: true
                        },
                        {
                            field: "Price",
                            title: "Price",
                            align: "left",
                            valign: "middle",
                            sortable: true,
                            formatter: priceFormatter
                        },
                        {
                            field: "DateListed",
                            title: "Date Listed",
                            align: "left",
                            valign: "middle",
                            sortable: true,
                            formatter: dateFormatter
                        },
                        {
                            field: "Author",
                            title: "Author",
                            align: "left",
                            valign: "middle",
                            sortable: true
                        }
                    ]
                }
            }
        };

        function dateFormatter(jsonDate) {

            if (!jsonDate) return "";

            var dateString = jsonDate.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var hour = ("0" + currentTime.getHours()).slice(-2);
            var minute = ("0" + currentTime.getMinutes()).slice(-2);
            var second = ("0" + currentTime.getSeconds()).slice(-2);

            var date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

            return '<i class="text"></i> ' + date;
        }

        function priceFormatter(data) {
            return '$' + data.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');;
        }

        
    };

    angular.module('productModule').controller("PhotolistBSTableAngularController", ["$scope", "photoRepository", "$log", photolistController]);

})();