weatherApp.controller('forecastCtrl', ['forecastService', function (forecastService) {
  var vm = this;
  vm.city = "vadodara";
  vm.unit = "c"
  vm.results = {};
  var currentTemperature = {};

  forecastService.find(vm.city)
    .then(function (result) {
      vm.results.cityInfo = result.city;
      vm.results.list = result.list;
      vm.results.currentWeather = forecastService.getWeatherInfo(result);
      currentTemperature.currTempInfo = forecastService.getTempInfo(result);
      vm.getTemperature("c");      
    }, function (error) {
      vm.errors = error;
    });

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

 

}]);
