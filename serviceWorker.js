// constantes que configuran el SW
const CACHE_NAME = "v1_cache_buscador_peliculas";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./js/main.js",
    "./js/mountApp",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    "./css/styles.css",
    "https://unpkg.com/vue@next"
];


self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache
                .addAll(urlsToCache)
                .then(() => self.skipWaiting())
                .catch((err) => console.log(err))
        )
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }

            return fetch(e.request);
        })
    );
});



//Esto lo hice yo pero creo que tiene errores
// //Explicado en video 40
// self.addEventListener("install", e => {
//     e.waitUntil(
//         caches.open(CACHE_NAME).then(
//             cache => cache.addAll(urlsToCache).then(
//                 () => self.skipWaiting()
//             ).catch(
//                 err => console.log(err)
//             )
//         )
//     )
// })

// //Explicado en video 40
// self.addEventListener("activate", e => {
//     const cacheWhiteList = [CACHE_NAME]

//     e.waitUntil(
//         caches
//             .keys()
//             .then((cacheNames) => {
//                 return Promise.all(
//                     cacheNames.map((cacheName) => {
//                         if (cacheWhiteList.indexOf(cacheName) === -1) {
//                             return caches.delete(cacheName)
//                         }
//                     })
//                 );
//             })
//             .then(() => self.clients.claim())
//     );
// });

// //Explicado en video 40
// self.addEventListener("fetch", (e) => {
//     e.respondWith(
//         caches.match(e.request).then((res) => {
//             if (res) {
//                 return res
//             }
//             return fetch(e.request)
//         })
//     );
// });