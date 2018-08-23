weatherApp.controller('forecastCtrl', ['forecastService', function (forecastService) {

  var vm = this;

  vm.currentCity = "";
  vm.unit = "c"
  vm.results = {};
  var currentTemperature = {};

  forecastService.getCurrentPosition().then(function (data) {
    vm.getForecast(data.split(',')[1].replace(" ", ""));
  }, function (err) {
    console.log(err)
  });

  vm.getForecast = function (city) {
    forecastService.find(city)
      .then(function (result) {
        vm.results.cityInfo = result.city;
        vm.results.list = result.list;
        vm.results.currentWeather = forecastService.getWeatherInfo(result);
        currentTemperature.currTempInfo = forecastService.getTempInfo(result);
        vm.getTemperature("c");
      }, function (error) {
        vm.errors = error;
      });
  }

  vm.getTemperature = function (unit) {
    vm.currentTemperature = forecastService.getTemperatures(currentTemperature.currTempInfo, unit);
    vm.setTempList(unit);
  };

  vm.setTempList = function (unit) {
    vm.tempList = forecastService.get7Forecasts(vm.results.list, unit);
    console.log(vm.tempList)
  }

  vm.convertKM = function (speed) {
    return Math.round(speed * 1.609);
  }

  vm.submit = function () {
   vm.getForecast(vm.currentCity);
  }
}]);
