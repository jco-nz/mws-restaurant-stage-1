const cacheName = 'resto-cache-101';

const resourcesToCache = [
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/favicon.ico',
    '/index.html',
    '/restaurant.html',
    '/'
]


self.addEventListener('install', event => {
    console.log('Service Worker installed at', new Date().toLocaleTimeString());

    event.waitUntil(
        caches.open(cacheName)
            .then( cache => {
                return cache.addAll(resourcesToCache);
            })
            .catch(error => {
                console.log('Installation exception', error);
            })
    );

});


self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }

            if (!navigator.onLine) {
                console.log('App is offline!');
            } else {
                return fetch(event.request).then(response => {
                    caches.open(cacheName)
                    .then(cache => {
                          cache.put(event.request, response);  
                    })
                    .catch(error => {
                        console.log('Unexpected issue encountered', error);
                    })

                    return response.clone();
                });
            }
        })
    );

});