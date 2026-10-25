/* Service worker : rend l'application utilisable hors ligne.
   Stratégie : le document et le manifeste passent par le réseau en premier,
   pour recevoir les mises à jour, avec repli sur le cache si hors ligne.
   Le reste est servi depuis le cache. */
var CACHE = "questions-du-jour-v1";
var FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./lib/jspdf.umd.min.js"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FICHIERS); }).catch(function(){}));
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(cles){
      return Promise.all(cles.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var reseauDabord = req.mode === "navigate" || /index\.html|manifest\.webmanifest/.test(req.url);
  if(reseauDabord){
    e.respondWith(
      fetch(req).then(function(rep){
        var copie = rep.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copie); });
        return rep;
      }).catch(function(){ return caches.match(req).then(function(r){ return r || caches.match("./index.html"); }); })
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(function(r){
      return r || fetch(req).then(function(rep){
        var copie = rep.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copie); });
        return rep;
      });
    })
  );
});
