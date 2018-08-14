weatherApp.controller('cityCtrl', ['$location', 'cityService', function ($location, cityService) {

    var vm = this;   

    vm.submit = function () {
        $location.path("/forecast");
    }
}]);
