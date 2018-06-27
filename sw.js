self.addEventListener('install', function(event) {
  var myInit = { method: 'GET',
               headers: {
                   'Content-Type': 'application/json'
               },
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('testStuff.json', myInit);

  event.waitUntil(
    caches.open('v3').then(function(cache) {
  return fetch(myRequest, myInit)
  .then(function(response){
    return response.json();
})
  .then(function(myJson) {
    var arrayBuilt = myJson.testArray;
    console.log(myJson.testArray);
    return cache.addAll(arrayBuilt);
  });
      
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).then(function(response) {
//     // caches.match() always resolves
//     // but in case of success response will have value
//     if (response !== undefined) {
//       return response;
//     } else {
//       return fetch(event.request).then(function (response) {
//         // response may be used only once
//         // we need to save clone to put one copy in cache
//         // and serve second one
//         let responseClone = response.clone();
        
//         caches.open('v3').then(function (cache) {
//           cache.put(event.request, responseClone);
//         });
//         return response;
//       }).catch(function () {
//         return caches.match('/gallery/myLittleVader.jpg');
//       });
//     }
//   }));
// });
