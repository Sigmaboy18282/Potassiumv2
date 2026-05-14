importScripts('scramjet.config.js');

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin + __scramjet$config.prefix)) {
        event.respondWith(
            handleRequest(event.request)
        );
    }
});

async function handleRequest(request) {
    const encoded = request.url.split(__scramjet$config.prefix)[1];
    const target = atob(encoded.replace(/_/g, '/').replace(/-/g, '+'));
    
    // This is the actual Scramjet rewrite logic
    const response = await fetch(target, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36' }
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.delete('X-Frame-Options');
    newHeaders.delete('Content-Security-Policy');

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    });
}
