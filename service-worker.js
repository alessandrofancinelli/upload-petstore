const CACHE_NAME = "visiospot-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/logo_marchioREG_2022_grigio.png",
  "/manifest.json"
];

// Installazione del service worker e caching delle risorse
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Apertura del cache");
        return cache.addAll(urlsToCache);
      })
  );
});

// Attivazione del service worker e pulizia del vecchio cache
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("Rimozione vecchio cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Recupero delle risorse dalla cache o dal network
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
