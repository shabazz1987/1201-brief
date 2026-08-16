const CACHE = '1201-brief-shell-v1';
const SHELL = [
  '/1201-brief/',
  '/1201-brief/index.html',
  '/1201-brief/apple-touch-icon.png',
  '/1201-brief/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  const isDoc = req.mode === 'navigate' || req.destination === 'document'
    || url.pathname.endsWith('.html') || url.pathname.endsWith('/')
    || url.pathname.endsWith('today.html') || url.pathname.endsWith('archive.json');
  if (isDoc || url.search.includes('t=')) {
    event.respondWith(
      fetch(new Request(req, { cache: 'no-store' })).catch(() => caches.match(req))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }))
  );
});

self.addEventListener('push', event => {
  let data = { title: '12:01 Daily', body: "Today's brief is ready", url: 'https://shabazz1987.github.io/1201-brief/' };
  try { if (event.data) data = Object.assign(data, event.data.json()); } catch (e) {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/1201-brief/apple-touch-icon.png',
    badge: '/1201-brief/apple-touch-icon.png',
    data: { url: data.url || 'https://shabazz1987.github.io/1201-brief/' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || 'https://shabazz1987.github.io/1201-brief/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if (c.url.startsWith('https://shabazz1987.github.io/1201-brief') && 'focus' in c) return c.focus();
    }
    return clients.openWindow(url);
  }));
});
