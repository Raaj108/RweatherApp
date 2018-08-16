weatherApp.controller('forecastCtrl', ['forecastService', function (forecastService) {
  var vm = this;
  vm.city = "vadodara";
  vm.results = {
    city: '',
    weather: ''
  };
  forecastService.find(vm.city)
    .then(function (result) {
      vm.results.city = result.city;
      vm.results.weather = forecastService.weatherInfo(result);
      vm.results.temperature = forecastService.tempInfo(result);
      vm.results.wind = forecastService.windInfo(result);
      console.log(result)
    }, function (error) {
      vm.errors = error;
    });
  //console.log(vm.results);

  vm.changeUnit = function (unit) {
    if (unit === 'f') {
      vm.fahrenheit = true;
    } else {
      vm.fahrenheit = false;
    }
  }

  vm.convertToFahrenheit = function (degk) {
    return Math.round(1.8 * (degk - 273) + 32);
  }

  vm.convertToCelcius = function (degk) {
    return Math.round(degk - 273.15);
  }

  vm.convertDate = function (date) {
    return new Date(date * 1000);
  }
  
  vm.convertKM = function (speed) {
    return Math.round(speed * 1.609);
  }

}]);
