console.log("Hi. Service worker here")

//define cache for logic and js
const BUDGET_CACHE = "budget-logic-cache"

//define cache for data
const BUDGET_DATA_CACHE = "budget-data-cache"

var urlCacheArray = [
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
]

//install function
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(BUDGET_CACHE).then(function (cache) {
            return (cache.addAll(urlCacheArray))
        })
    );
});

//store all get requests to the api in the cache

self.addEventListener("fetch", function (event) {
    if (event.request.url.includes("/api/")) {
        event.respondWith(
            caches.open(BUDGET_DATA_CACHE).then(cache => {
                return fetch(event.request)
                    .then(response => {
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }

                        return response;
                    })
                    .catch(err => {
                        return cache.match(event.request);
                    });
            }).catch(err => console.log(err))
        );

        return;
    }

    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return caches.match("/");
                }
            });
        })
    );
});