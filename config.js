//ROUTE CONFIGURATION
weatherApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('city');

    $stateProvider
        .state('city', {
            url: '/city',
            templateUrl: 'modules/city/city.view.html',
            controller: 'cityCtrl',
            controllerAs: 'vm'
        })
        .state('forecast', {
            url: '/forecast',
            templateUrl: 'modules/forecast/forecast.view.html',
            controller: 'forecastCtrl',
            controllerAs: 'vm'
        });


    // use the HTML5 History API
    
}]);
