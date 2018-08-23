//ROUTE CONFIGURATION
weatherApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('forecast');

    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: 'modules/search/search.view.html',
            controller: 'searchCtrl',
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
