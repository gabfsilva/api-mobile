const CACHE_NAME = 'taskList-cache-v2';

const urlsToCache = [
  '/',
  'index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('taskList-cache-') &&
                   cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
  );
});