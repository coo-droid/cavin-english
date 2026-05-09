// CAVIN English Service Worker - Offline support
const CACHE_NAME = 'cavin-english-v6';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=6',
  './data.js?v=6',
  './storage.js?v=6',
  './speech.js?v=6',
  './vocab.js?v=6',
  './shadowing.js?v=6',
  './modules.js?v=6',
  './app.js?v=6'
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
