// <define:CACHE_FILES>
var define_CACHE_FILES_default = ["runtime.wasm", "app-vfs.tar.gz", "perl-lib-vfs.tar.gz", "shell.js", "perl-worker.js", "index.html"];

// node_modules/@webdyne/webdyne-zeroperl-browser/browser/channel.js
async function requestData(request) {
  return {
    url: request.url,
    method: request.method,
    headers: [...request.headers],
    body: ["GET", "HEAD"].includes(request.method) ? void 0 : await request.arrayBuffer()
  };
}
function receiveResponse(port, signal) {
  return new Promise((resolve, reject) => {
    let controller;
    let finished = false;
    const timeout = setTimeout(() => fail(Error("Local runtime did not return response headers within 60 seconds")), 6e4);
    const close = () => {
      finished = true;
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abort);
      port.close();
    };
    const fail = (error) => {
      if (finished) return;
      port.postMessage({ type: "cancel" });
      controller?.error(error);
      reject(error);
      close();
    };
    const abort = () => fail(signal.reason ?? new DOMException("Aborted", "AbortError"));
    if (signal?.aborted) {
      abort();
      return;
    }
    signal?.addEventListener("abort", abort, { once: true });
    port.onmessage = ({ data }) => {
      if (data.type === "headers") {
        clearTimeout(timeout);
        const body = data.hasBody ? new ReadableStream({
          start(value) {
            controller = value;
          },
          pull() {
            port.postMessage({ type: "pull" });
          },
          cancel() {
            port.postMessage({ type: "cancel" });
            close();
          }
        }, { highWaterMark: 0 }) : null;
        resolve(new Response(body, { status: data.status, statusText: data.statusText, headers: data.headers }));
        if (!data.hasBody) close();
      } else if (data.type === "chunk") controller.enqueue(new Uint8Array(data.bytes));
      else if (data.type === "end") {
        controller?.close();
        close();
      } else if (data.type === "error") fail(Error(data.message));
    };
    port.onmessageerror = () => fail(Error("Invalid local response message"));
  });
}

// node_modules/@webdyne/webdyne-zeroperl-browser/browser/service-worker.js
var base = new URL("./", self.location.href);
var virtual = new URL("__webdyne_app/", base);
var cacheName = `webdyne-local:${base.pathname}:${"714500a8c3b231f080a3"}`;
var cachedUrls = new Set(define_CACHE_FILES_default.map((name) => new URL(name, base).href));
cachedUrls.add(base.href);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll([...cachedUrls])));
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(`webdyne-local:${base.pathname}:`) && name !== cacheName) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});
async function localResponse(event) {
  const client = event.clientId && await self.clients.get(event.clientId);
  if (!client || client.type !== "window") return new Response("Open this application through its index.html shell.", { status: 503 });
  const channel = new MessageChannel();
  const request = await requestData(event.request);
  const response = receiveResponse(channel.port1, event.request.signal);
  client.postMessage({ type: "webdyne-request", request }, [channel.port2]);
  return response;
}
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  url.hash = "";
  if (url.origin === virtual.origin && url.pathname.startsWith(virtual.pathname)) {
    event.respondWith(localResponse(event).catch((error) => new Response(error.message, { status: 502 })));
  } else if (event.request.method === "GET" && cachedUrls.has(url.href)) {
    event.respondWith(caches.open(cacheName).then(async (cache) => await cache.match(event.request) ?? fetch(event.request)));
  }
});
