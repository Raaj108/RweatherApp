weatherApp.controller('forecastCtrl', ['locationService', 'dateService', 'graphService', 'forecastService', function (locationService, dateService, graphService, forecastService) {

  var vm = this;
  vm.defaultUnit = "c";
  vm.data = {};

 /* locationService.getCurrentPosition().then(function (data) {
    vm.getForecast(data.split(',')[1].replace(" ", ""));
  }, function (err) {
    console.log(err)
  });*/

  vm.getForecast = function (city) {
    forecastService.find(city)
      .then(function (result) {
        vm.data = forecastService.formatData(result);
        var date = dateService.getDate(vm.data.list[0].dt) + " " + dateService.getMonth(vm.data.list[0].dt);
        vm.getTemperature(date, vm.defaultUnit);
      }, function (error) {
        vm.errors = error;
      });
  }

  vm.getTemperature = function (objectId, unit) {
    console.log(objectId, unit)
    vm.tempList = vm.dailyForecast(unit);
    vm.activeTempList = vm.tempList[objectId];
    graphService.setGraphData(vm.setTempList(unit));
  };

  vm.setTempList = function (unit) {
    return forecastService.getDataForGraph(vm.data.list, unit);
  }

  vm.dailyForecast = function (unit) {
    return forecastService.setDailyForecast(vm.data.list, unit);
  }

  vm.convertKM = function (speed) {
    return Math.round(speed * 1.609);
  }

  vm.submit = function () {
    vm.getForecast(vm.currentCity);
  }
}]);
