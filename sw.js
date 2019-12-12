/**
 * Service Worker By {Stanley Masinde}
 * Twitter @StanleyMasinde_
 * Github @stannlee
 */

const CACHE_NAME = 'app_offline'


/**
 * Handle the install event
 * 
 * 
 */
self.addEventListener('install', function (event) {
    caches.delete(CACHE_NAME)
    caches.open(CACHE_NAME)
        .then((opened) => {
            opened.addAll([
                'offline.html'
            ])
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            self.skipWaiting()
        })
})

/**
 * Handle the fetch event
 * 
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(res => {
                return res
            }).catch(err => {
                return caches.match('offline.html')
            })
    )
})