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
            //console.log(result)
        }, function (error) {
            vm.errors = error;
        });
    console.log(vm.results);

}]);
