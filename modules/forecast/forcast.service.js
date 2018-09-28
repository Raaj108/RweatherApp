weatherApp.factory('forecastService', ['$resource', '$q', '$window', 'dateService', function ($resource, $q, $window, dateService) {

  var services = {};

  //Call Open weather api to get the weather information
  services.find = function (city) {
    var baseURL = "https://api.openweathermap.org/data/2.5/forecast"; //5 days, every 3 hour
    //var baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily" //16 days daily weather
    var weatherAPI = $resource(baseURL, {
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

  //Swap the units according to the user's request
  services.setTempUnit = function (temp, unit) {
    if (unit === 'f') {
      return Math.round(1.8 * (temp - 273) + 32);
    }
    if (unit === 'c') {
      return Math.round(temp - 273.15);
    }
  }

  //Extract 7 weather info.
  services.get7Forecasts = function (list, unit) {
    var tempList = [];
    for (i = 0; i < 7; i++) {
      var main = {};
      main.objectId = i;
      main.day = dateService.getDay(list[i].dt);
      main.date = dateService.getDate(list[i].dt) + " " + dateService.getMonth(list[i].dt);
      main.time = dateService.getTime(list[i].dt);
      main.temp = services.setTempUnit(list[i].main.temp, unit);
      main.temp_max = services.setTempUnit(list[i].main.temp_max, unit);
      main.temp_min = services.setTempUnit(list[i].main.temp_min, unit);
      main.humidity = list[i].main.humidity;
      main.iconSrc = "https://openweathermap.org/img/w/" + list[i].weather[0].icon + ".png";
      main.weather = list[i].weather[0];
      main.wind = list[i].wind;
      tempList.push(main);
    }
    return tempList;
  }

  services.setDailyForecast = function (list, unit) {
    var arr = {};

    for (i = 0; i < list.length; i++) {
      var objectKey = dateService.getDate(list[i].dt) + " " + dateService.getMonth(list[i].dt);
      if (!arr.hasOwnProperty(objectKey)) {
        arr[objectKey] = {
          objectId: i,
          day: dateService.getDay(list[i].dt),
          date: objectKey,
          time: dateService.getTime(list[i].dt),
          temp: services.setTempUnit(list[i].main.temp, unit),
          temp_max: services.setTempUnit(list[i].main.temp_max, unit),
          temp_min: services.setTempUnit(list[i].main.temp_min, unit),
          humidity: list[i].main.humidity,
          iconSrc: "https://openweathermap.org/img/w/" + list[i].weather[0].icon + ".png",
          weather: list[i].weather[0],
          wind: list[i].wind
        }
      }
    }

    return arr;
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
