weatherApp.controller('graphCtrl', ['graphService', function (graphService) {

  var vm = this;
  vm.graphData = graphService.graphData;

}]);
