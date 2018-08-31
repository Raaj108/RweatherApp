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
        vm.getTemperature(0, vm.unit);
      }, function (error) {
        vm.errors = error;
      });
  }

  vm.getTemperature = function (objectId, unit) {
    // vm.currentTemperature = forecastService.getTemperatures(currentTemperature.currTempInfo, unit);
    vm.tempList = vm.setTempList(unit);
    vm.activeTempList = vm.tempList[objectId]
    console.log(vm.activeTempList)
  };

  vm.setTempList = function (unit) {
    return forecastService.get7Forecasts(vm.results.list, unit);
  }

  vm.convertKM = function (speed) {
    return Math.round(speed * 1.609);
  }

  vm.submit = function () {
    vm.getForecast(vm.currentCity);
  }
}]);
