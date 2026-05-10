// CAVIN English Service Worker - Offline support
const CACHE_NAME = 'cavin-english-v9';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=9',
  './data.js?v=9',
  './storage.js?v=9',
  './speech.js?v=9',
  './vocab.js?v=9',
  './shadowing.js?v=9',
  './modules.js?v=9',
  './app.js?v=9'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // OpenAI APIなどはキャッシュせず素通し
  if (e.request.url.includes('api.openai.com')) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (!res || res.status !== 200) return res;
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
