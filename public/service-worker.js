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