/* Если интернета нет, вместо ошибки браузера показывается offline.html.
   Сам сайт не кэшируется, поэтому обновления видны сразу. */
var CACHE = "offline-v2";
var FILES = ["/offline.html", "/img/logo.png", "/img/favicon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var r = e.request;
  if(r.mode === "navigate"){
    /* no-store: без сети не показывать старую копию страницы, где ничего не грузится */
    e.respondWith(fetch(r, { cache: "no-store" }).catch(function(){ return caches.match("/offline.html"); }));
  } else if(FILES.indexOf(new URL(r.url).pathname) > -1 && new URL(r.url).origin === location.origin){
    e.respondWith(fetch(r).catch(function(){ return caches.match(r, { ignoreSearch: true }); }));
  }
});
