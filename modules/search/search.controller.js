weatherApp.controller('searchCtrl', ['$location', 'searchService', function ($location, searchService) {

  var vm = this;


  searchService.getCurrentPosition().then(function (data) {
    vm.currentAddress = data;
  }, function (err) {
    console.log(err)
  });

  vm.submit = function () {
    $location.path("/forecast");
  }
}]);
