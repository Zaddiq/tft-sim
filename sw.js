// Offline support. Change CACHE (for example to "tftsim-v2") when you replace icons or other fixed files.
var CACHE = "tftsim-v1";
var CDN = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
var LOCAL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(LOCAL).then(function () {
        // The PDF library comes from a CDN; keep a copy so saving PDFs works offline.
        return fetch(CDN, { mode: "cors" })
          .then(function (r) { if (r.ok) return c.put(CDN, r); })
          .catch(function () {});
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  // The page itself: try the network first so updates show up, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (m) { return m || caches.match("index.html"); });
        })
    );
    return;
  }

  // Everything else: saved copy first, then the network (and save what we fetched).
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var ours = new URL(req.url).origin === location.origin || req.url === CDN;
        if (res && res.ok && ours) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
