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


  services.getTemperatures = function (currTempInfo, unit) {
    var currTemp = {};
    currTemp.temp = services.setTempUnit(currTempInfo.temp, unit);
    currTemp.temp_max = services.setTempUnit(currTempInfo.temp_max, unit);
    currTemp.temp_min = services.setTempUnit(currTempInfo.temp_min, unit);
    return currTemp;
  }

  services.setTempUnit = function (temp, unit) {
    if (unit === 'f') {
      return Math.round(1.8 * (temp - 273) + 32);
    }
    if (unit === 'c') {
      return Math.round(temp - 273.15);
    }
  }

  services.get7Forecasts = function (list, unit) {
    var tempList = [];
    for (i = 0; i < 7; i++) {
      var main = {};
      main.day = services.getDay(list[i].dt);
      main.temp = services.setTempUnit(list[i].main.temp, unit);
      main.temp_max = services.setTempUnit(list[i].main.temp_max, unit);
      main.temp_min = services.setTempUnit(list[i].main.temp_min, unit);
      main.iconSrc = "http://openweathermap.org/img/w/" + list[i].weather[0].icon + ".png";
      main.weather = list[i].weather[0];
      main.wind = list[i].wind;
      tempList.push(main);
    }
    return tempList;
  }

  services.getDate = function (date) {
    return new Date(date * 1000);
  }

  services.getDay = function (date) {
    return new Date(date * 1000).getDay();
  }

  services.getWeatherInfo = function (result) {
    return result.list[0].weather[0];
  }

  services.getTempInfo = function (result) {
    return result.list[0].main;
  }

  services.windInfo = function (result) {
    return result.list[0].wind;
  }

  return services;
}]);
