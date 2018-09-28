weatherApp.factory('geoLocationService', ['$q', '$window', function ($q, $window) {

  var services = {};

  //Get Current location of the user
  services.getCurrentPosition = function () {
    var deferred = $q.defer();
    if (!$window.navigator.geolocation) {
      deferred.reject('Geolocation not supported.');
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
          $.ajax({
            type: "GET",
            url: $url,
            dataType: "json",
            success: function (data) {
              console.log(data)
              deferred.resolve(data.results[0].formatted_address);
            },
            error: function (error) {
              deferred.reject(error);
            }
          });
        },
        function (err) {
          deferred.reject(err);
        });
    }
    return deferred.promise;
  }

  return services;
}]);
