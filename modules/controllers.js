weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {

    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        appid: "b7b34c59bf0046797f7135fbce4d68f8"
    }).$promise.then(function (forecast) {
        console.log(forecast);
    }, function (error) {
        console.log(error);
    });


    $scope.convertToCelcius = function (degk) {

        return Math.round(degk - 273.15);
    }
    $scope.convertDate = function (date) {
        return new Date(date * 1000);
    }

}]);
