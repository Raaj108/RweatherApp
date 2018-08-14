weatherApp.factory('forecastService', ['$resource', function ($resource) {
    var services = {};

    services.find = function (city) {
        var baseURL = "http://api.openweathermap.org/data/2.5/forecast";

        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", {
            callback: "JSON_CALLBACK"
        }, {
            get: {
                method: "JSONP"
            }
        });

        var weatherResult = weatherAPI.get({
            q: city,
            appid: "b7b34c59bf0046797f7135fbce4d68f8"
        }).$promise;

        return weatherResult;
    }

    services.getDate = function (date) {
        return new Date(date * 1000);
    }

    services.weatherInfo = function (result) {
        return result.list[0].weather[0];
    }

    services.tempInfo = function (result) {
        return result.list[0].main;
    }
    return services;
}]);
