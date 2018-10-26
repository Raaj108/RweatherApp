weatherApp.controller('forecastCtrl', ['locationService', 'dateService', 'graphService', 'forecastService', function (locationService, dateService, graphService, forecastService) {

  var vm = this;
  vm.defaultUnit = "c";
  vm.data = {};

  locationService.getCurrentPosition().then(function (data) {
    if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
      vm.formatErrors(data);
    } else {
      vm.getForecast(data.split(',')[1].replace(" ", ""));
    }
  }, function (err) {
    vm.formatErrors(err);
  });

  vm.getForecast = function (city) {
    forecastService.find(city)
      .then(function (result) {
        vm.data = forecastService.formatData(result);
        var date = dateService.getDate(vm.data.list[0].dt) + " " + dateService.getMonth(vm.data.list[0].dt);
        vm.getTemperature(date, vm.defaultUnit);
      }, function (error) {
        vm.errors = vm.formatErrors(error);
      });
  }

  vm.getTemperature = function (objectId, unit) {
    vm.tempList = vm.dailyForecast(unit);
    vm.activeTempList = vm.tempList[objectId];
    if (unit == 'f') {
      document.getElementById("fhite").classList.add('active');
      document.getElementById("celcius").classList.remove('active');
    } else {
      document.getElementById("celcius").classList.add('active');
      document.getElementById("fhite").classList.remove('active');
    }

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

  vm.scrollUp = function () {
    var currPosition = $('#containerOuter').scrollTop();
    var newPosition = currPosition - 300;
    $('#containerOuter').animate({
      scrollTop: newPosition
    }, 200);
  }

  vm.scrollDown = function () {
    var currPosition = $('#containerOuter').scrollTop();
    var newPosition = currPosition + 300;
    $('#containerOuter').animate({
      scrollTop: newPosition
    }, 200);
  }

  vm.formatErrors = function (error) {
    console.log(error);
    var errorMessages = [];
    if (error.status === 404 && error.config.url === "https://api.openweathermap.org/data/2.5/forecast") {
      errorMessages.push("Please enter a correct city name");

    } else {
      errorMessages.push("Something went wrong! Please try again after sometime.");
    }
    console.log(errorMessages);
  }

  vm.submit = function () {
    vm.getForecast(vm.currentCity);
  }
}]);
