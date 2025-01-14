self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        './',
        'index.html',
        'styles.css',
        'script.js',
        'about-us.html',
        'ahadit.html',
        'apple-touch-icon.png',
        'contact-us.html',
        'favicon.ico',
        'favicon.svg',
        'favicon-96x96.png',
        'Islamic wallpapers.html',
        'lantern.png',
        'privacy-policy.html',
        'quran.html',
        'Scrollbar.css',
        'Scrollbar.js',
        'tasbeeh_with_records.html',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png',
        'إخلاء المسؤولية.html',
        'شروط الاستخدام.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

