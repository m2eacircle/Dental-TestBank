const CACHE_NAME = 'dental-testbank-v2';
const BASE = '/education/testbank';
const urlsToCache = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/favicon.svg',
  BASE + '/icon-192x192.png',
  BASE + '/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache one by one so a single 404 doesn't abort everything
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url).catch(e => console.warn('Cache miss:', url, e)))
        );
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
