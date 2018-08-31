weatherApp.factory('forecastService', ['$resource', '$q', '$window', function ($resource, $q, $window) {
  var services = {};

  //Get Current location of the user
  services.getCurrentPosition = function () {
    var deferred = $q.defer();
    if (!$window.navigator.geolocation) {
      deferred.reject('Geolocation not supported.');
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
          $.ajax({
            type: "GET",
            url: $url,
            dataType: "json",
            success: function (data) {
              deferred.resolve(data.results[0].formatted_address);
            },
            error: function (error) {
              deferred.reject(error);
            }
          });
        },
        function (err) {
          deferred.reject(err);
        });
    }
    return deferred.promise;
  }

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
      main.day = services.getDay(list[i].dt);
      main.date = services.getDate(list[i].dt) + " " + services.getMonth(list[i].dt);
      main.time = services.getTime(list[i].dt);
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

  services.getDate = function (date) {
    return new Date(date * 1000).getDate();
  }

  services.getDay = function (date) {
    var weekDay;
    switch (new Date(date * 1000).getDay()) {
      case 0:
        weekDay = "Sun"
        break;
      case 1:
        weekDay = "Mon"
        break;
      case 2:
        weekDay = "Tue"
        break;
      case 3:
        weekDay = "Wed"
        break;
      case 4:
        weekDay = "Thu"
        break;
      case 5:
        weekDay = "Fri"
        break;
      case 6:
        weekDay = "Sat"
        break;
      default:
        weekDay = "Not Valid Weekday"
    }
    return weekDay;
  }

  services.getMonth = function (date) {
    var month;
    switch (new Date(date * 1000).getMonth()) {
      case 0:
        month = "Jan"
        break;
      case 1:
        month = "Feb"
        break;
      case 2:
        month = "Mar"
        break;
      case 3:
        month = "Apr"
        break;
      case 4:
        month = "May"
        break;
      case 5:
        month = "Jun"
        break;
      case 6:
        month = "Jul"
        break;
      case 7:
        month = "Aug"
        break;
      case 8:
        month = "Sep"
        break;
      case 9:
        month = "Oct"
        break;
      case 10:
        month = "Nov"
        break;
      case 11:
        month = "Dec"
        break;
      default:
        month = "Not Valid Month"
    }
    return month;
  }

  services.getTime = function (date) {
    var date = new Date(date * 1000);
    var unit, time;
    var hour = date.getHours();

    if (hour == 0 || hour < 12) {
      unit = "AM";
    } else {
      unit = "PM";
    }

    time = hour + ":00 " + unit
    return time;
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
