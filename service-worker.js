// Define the cache name
const CACHE_NAME = 'pwa-cache-v1';
// List of assets to pre-cache
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'logo.png',
  'lantern.png',
  'ahadit.html',
  'about-us.html',
  'contact-us.html',
  'privacy-policy.html',
  'quiz.html',
  'quran.html',
  'tasbeeh_with_records.html',
  'إخلاء المسؤولية.html',
  'شروط الاستخدام.html',
];

// Install event: Pre-cache resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve cached response if available, otherwise fetch from network
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          // Optionally cache the new response
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => {
      // Fallback for offline scenario
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
    })
  );
});
