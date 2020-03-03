var cachName = 'coronavirus'
var filesToCache = [
    '/',
    '/index.html',
    '/js/main.js',
    '/js/jquery.js',
    '/js/bootstrap.bundle.min.js',
    '/js/bootstrap.min.js',
    '/css/bs4rtl.css',
    '/css/main.css',
    '/font/Vazir.tff',
    '/font/Vazir.woff'
]

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(cachName).then(cache=>{
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})
