weatherApp.controller('forecastCtrl', ['locationService', 'dateService', 'graphService', 'forecastService', function (locationService, dateService, graphService, forecastService) {

  var vm = this;
  vm.app = {
    isLoading: true,
    defaultUnit: "c",
    rawData: {}
  }


  /*****************************************************************************
   *
   * Create localStorage object which can be used to access the current user's 
   * local storage space.
   *
   ****************************************************************************/

  var localStorage = window.localStorage;

  // TODO add saveSelectedCities function here
  // Save list of cities to localStorage.
  vm.app.saveSelectedCity = function (cityToSave) {
    localStorage.selectedCity = cityToSave;
  };

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  vm.app.getForecast = function (city) {

    // TODO add cache logic here

    // Call the forecastService's find method to fetch the fresh forecast data
    forecastService.find(city)
      .then(function (result) {
        vm.app.rawData = forecastService.formatData(result); //format the result
        var date = dateService.getDate(vm.app.rawData.list[0].dt) + " " + dateService.getMonth(vm.app.rawData.list[0].dt); //customize date format
        vm.app.getDataToDisplay(date, vm.app.defaultUnit);
      }, function (error) {
        vm.errors = vm.formatErrors(error);
      });
  }

  /*
   * Extract the datewise temperature, minimum temperature and maximum temperature
   * from the forecast data
   */
  vm.app.getDataToDisplay = function (date, unit) {
    vm.app.dataToDisplay = forecastService.setDailyForecast(vm.app.rawData.list, unit);
    vm.app.selectedForecastCard = vm.app.dataToDisplay[date];
    if (unit == 'f') {
      document.getElementById("fhite").classList.add('active');
      document.getElementById("celcius").classList.remove('active');
    } else {
      document.getElementById("celcius").classList.add('active');
      document.getElementById("fhite").classList.remove('active');
    }
    graphService.setGraphData(vm.app.extractDataForGraph(unit)); //set graph data
  };

  vm.app.extractDataForGraph = function (unit) {
    return forecastService.getDataForGraph(vm.app.rawData.list, unit);
  }

  /*****************************************************************************
   *
   * User Friendly Functionalities
   *
   ****************************************************************************/

  //Gets the forecast by searching city name
  vm.app.submit = function () {    
    vm.app.getForecast(vm.app.searchCity);
    vm.app.saveSelectedCity(vm.app.searchCity);
  }

  /*
   *Forecast scroller for 7 days
   */
  //scroll Up
  vm.scrollUp = function () {
    var currPosition = $('#containerOuter').scrollTop();
    var newPosition = currPosition - 300;
    $('#containerOuter').animate({
      scrollTop: newPosition
    }, 200);
  }
  //Scroll Down
  vm.scrollDown = function () {
    var currPosition = $('#containerOuter').scrollTop();
    var newPosition = currPosition + 300;
    $('#containerOuter').animate({
      scrollTop: newPosition
    }, 200);
  }

  /*****************************************************************************
   *
   * Handle error messages
   *
   ****************************************************************************/
  vm.formatErrors = function (error) {   
    var errorMessages = [];
    if (error.status === 404 && error.config.url === "https://api.openweathermap.org/data/2.5/forecast") {
      errorMessages.push("Please enter a correct city name");

    } else {
      errorMessages.push("Something went wrong! Please try again after sometime.");
    }
    console.log(errorMessages);
  }

  // TODO add startup code here
  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this app, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/
  vm.app.init = function () {
    vm.app.selectedCity = localStorage.selectedCity;   
    if (vm.app.selectedCity) {
      vm.app.getForecast(vm.app.selectedCity);
    } else {
      /* The user is using the app for the first time, or the user has not
       * searched and saved any cities, get the user's location via IP lookup and then inject
       * that data into the page. Then store the city in localstorage.
       */
      locationService.getCurrentPosition().then(function (response) {
        if (response.status === "REQUEST_DENIED" || response.status === "OVER_QUERY_LIMIT") {
          vm.formatErrors(response);
        } else {
          vm.app.selectedCity = response.split(',')[1].replace(" ", "");
          vm.app.getForecast(vm.app.selectedCity);
          vm.app.saveSelectedCity(vm.app.selectedCity);
        }
      }, function (err) {
        vm.formatErrors(err);
      });
    }
  }
  vm.app.init();
}]);
