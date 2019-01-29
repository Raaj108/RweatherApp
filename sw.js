var CACHE_NAME = 'rweatherApp_cache_v1';
var urlsToCache = [
  //Array of urls of files to be cached
  '/dest/css/styles.css',
  '/images'
];


//Perform serviceWorker installation
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

//Fetch cache 
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      //If we have a matching response, we return the cached value
      if (response) {
        return response;
      }
      //Otherwise use fetch method to make a network request and return the data if anything can be retrieved from the network and then adding new data to the cache
      return fetch(event.request).then(
        function (response) {
          // Check if we received a valid response from the network or not. If not just return the response without caching anything.
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          //If Response is valid, then...
          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });
          return response;
        }
      )
    })
  );
});
