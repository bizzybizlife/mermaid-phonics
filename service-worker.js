const CACHE_NAME = 'mermaid-phonics-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './base_body.png',
  './mermaid_closeup.png',
  './title_bg.png',
  './Gemini_Generated_Image_qrwu2mqrwu2mqrwu.png',
  './hairstyles/hair_1.png',
  './hairstyles/hair_2.png',
  './hairstyles/hair_3.png',
  './hairstyles/hair_4.png',
  './outfits/top_1.png',
  './outfits/top_2.png',
  './outfits/top_3.png',
  './outfits/top_4.png'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
