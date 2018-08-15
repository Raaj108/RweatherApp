weatherApp.controller('searchCtrl', ['$location', 'searchService', function ($location, searchService) {

    var vm = this;   

    vm.submit = function () {
        $location.path("/forecast");
    }
}]);
