const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v2");
  await cache.addAll(resources);
};

self.addEventListener("install", async (event) => {
  self.importScripts("./cache.mjs");
  const cachedAssets = self.appFileCache?.files;

  if (!cachedAssets) {
    throw new Error("Missing file cache manifest.");
  }

  event.waitUntil(addResourcesToCache(cachedAssets));
});

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
