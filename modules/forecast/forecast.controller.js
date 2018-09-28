weatherApp.controller('forecastCtrl', ['geoLocationService', 'dateService', 'forecastService', function (geoLocationService, dateService, forecastService) {

  var vm = this;
  vm.currentCity = "";
  vm.unit = "c"
  vm.results = {};

  geoLocationService.getCurrentPosition().then(function (data) {
    vm.getForecast(data.split(',')[1].replace(" ", ""));
  }, function (err) {
    console.log(err)
  });

  vm.getForecast = function (city) {
    forecastService.find(city)
      .then(function (result) {
        vm.results.cityInfo = result.city;
        vm.results.list = result.list;
        var date = dateService.getDate(vm.results.list[0].dt) + " " + dateService.getMonth(vm.results.list[0].dt);
        vm.getTemperature(date, vm.unit);
      }, function (error) {
        vm.errors = error;
      });
  }

  vm.getTemperature = function (objectId, unit) {
    vm.tempList = vm.dailyForecast(unit);
    vm.activeTempList = vm.tempList[objectId];
  };

  vm.setTempList = function (unit) {
    return forecastService.get7Forecasts(vm.results.list, unit);
  }

  vm.dailyForecast = function () {
    return forecastService.setDailyForecast(vm.results.list, vm.unit);
  }

  vm.convertKM = function (speed) {
    return Math.round(speed * 1.609);
  }

  vm.submit = function () {
    vm.getForecast(vm.currentCity);
  }
}]);
