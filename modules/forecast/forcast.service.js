weatherApp.factory('forecastService', ['$resource', '$q', '$window', 'dateService', function ($resource, $q, $window, dateService) {

  var services = {};

  /**************************************************************************************
   *                                                                                     *
   * Call Open weather api to fetch the freshest weather information                     *
   *                                                                                     *
   ***************************************************************************************/
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

  //Format the result from openweather.com accouring to rweatherapp requirement
  services.formatData = function (data) {
    var formatedData = {};
    formatedData.cityInfo = data.city;
    formatedData.list = data.list;
    return formatedData;
  }

  /**************************************************************************************
   *                                                                                     
   * Extract the data to be displayed in today's forecast card forecast card scroller    
   * and put it into an object and then return the object                                       
   *
   ***************************************************************************************/
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
          wind: {
            speed: services.setWindSpeedUnit(list[i].wind.speed, unit),
            deg: list[i].wind.deg,
          }
        }
      }
    }
    return arr;
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

  services.setWindSpeedUnit = function (speed, unit) {
    if (unit === 'f') {
      return speed + ' mph';
    }
    if (unit === 'c') {
      return Math.round(speed * 1.609) + ' kmph';
    }
  }
  /**************************************************************************************
   *                                                                                     
   * Extract temperature info for next 24 hour with 3 hour's interval for graph
   *
   ***************************************************************************************/
  services.getDataForGraph = function (list, unit) {
    var tempList = [];
    for (i = 0; i < 9; i++) {
      var main = {};
      main.day = dateService.getDay(list[i].dt);
      main.date = dateService.getDate(list[i].dt) + " " + dateService.getMonth(list[i].dt);
      main.time = dateService.getTime(list[i].dt);
      main.temp = services.setTempUnit(list[i].main.temp, unit);
      main.tempUnit = unit;
      tempList.push(main);
    }
    return tempList;
  }

  return services;
}]);
