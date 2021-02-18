console.log("Hi. Service worker here")

//define cache for logic and js
const CACHE = "budget-logic-cache"

//define cache for data
const DATA_CACHE = "budget-data-cache"

var urlCacheArray = [
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
]