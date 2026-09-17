// Poultry SOP service worker
// 1. When you upload a new version, change VERSION below (match APP_VERSION in index.html).
// 2. Pages are fetched from the network first, so users get the new version on the next open.
//    If offline, the saved copy is used.
// 3. AI calls (Anthropic / OpenAI) are never cached.
const VERSION = "1.3.0";
const CACHE = "poultry-sop-" + VERSION;
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-512-maskable.png"];
const NO_CACHE = ["api.anthropic.com", "api.openai.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: "reload"})))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || NO_CACHE.includes(url.hostname)) return;

  // App pages: network first, fall back to cache when offline
  if (req.mode === "navigate" || (url.origin === location.origin && url.pathname.endsWith(".html"))){
    e.respondWith(
      fetch(req, {cache: "no-store"})
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })
        .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }
  // Other files and Google Fonts: cache first
  if (url.origin === location.origin || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque"){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});
