const CACHE_NAME = 'enem-ai-v1';
const urlsToCache = [
  '/homepage.html',
  '/public/login.html',
  '/public/main-dashboard.html',
  '/public/ai-chat.html',
  '/public/dashboard.html',
  '/public/community.html',
  '/public/settings.html',
  '/public/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;500&display=swap'
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
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});