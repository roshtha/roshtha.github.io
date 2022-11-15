//SERVICE WORKER IS A BIG EVENT LISTENER FILE

console.log('service worker inside sw.js');  //checking sw.js installed or not


//importScripts('scripts/js/idb.js');
//importScripts('scripts/js/idb-fn.js');
//importScripts('scripts/js/idb-init.js');


//install service worker
self.addEventListener('install', evt => {
    console.log('[SW] service worker INSTALLED.', evt);
    evt.waitUntil (
		caches.open('static')
			.then(function(cache) {
				console.log('[Service Worker] precaching App shell');
				cache.addAll([
					'/',
					'FSLogin.html', 
					'scripts/js/authentication.js',
					'scripts/js/validation.js',
					'scripts/js/app.js',
					'scripts/assets/css/Login.css',
					'MainPage.html',
					'scripts/assets/css/style.css',
					'scripts/assets/css/MPstyle.css',
					'scripts/assets/css/MainPageStyle.css',
					'scripts/assets/icon/themify-icons/themify-icons.css',
					'scripts/assets/pages/menu-search/css/component.css',
					'views/digipathofs/images/search.png',
					'scripts/assets/images/user.png',
					'views/digipathofs/images/logos.png',
					'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
					'FieldSurvey.html',
					'scripts/assets/css/FieldSurvey.css',
					'scripts/js/fsapp.js',
					'Menu.html',
					'scripts/assets/css/Menu.css',
					'ScreeningSurvey.html',
					'scripts/assets/css/ScreeningSurvey.css',
					'scripts/js/ssapp.js',
					'Oral.html',
					'scripts/assets/css/Oral.css',
					'scripts/js/oralapp.js',
					'Cervical.html',
					'scripts/assets/css/Cervical.css',
					'scripts/js/cerviapp.js',
					'Breast.html',
					'scripts/assets/css/Breast.css',
					'scripts/js/breastapp.js',
					'Others.html',
					'scripts/assets/css/Others.css',
					'scripts/js/othersapp.js',
					'Overview.html',
					'scripts/assets/css/Overview.css',
					'scripts/js/gone-offline.js',
					'scripts/js/promise.js',
					'scripts/js/fetch.js',
					'scripts/js/uid.js',
					'scripts/js/idb.js',
					'scripts/js/idb-fn.js',
					'scripts/js/idb-init.js',
					'scripts/dexie/dexie.js',
					'scripts/dexie/dexie.min.js'
				]);
				/*  cache.add('/');                       // By default it takes this path - /
				cache.add('FSLogin.html');			// By default it takes this path, we don't need to write /DigiPathoFS/-  /DigiPathoFS/FSLogin.html
				cache.add('scripts/js/app.js');  //	By default it takes this path, we don't need to write /DigiPathoFS/-  /DigiPathoFS/scripts/js/app.js  */
			})
		)
    });

//activate service worker
self.addEventListener('activate', evt => {
    console.log('++++ service worker ACTIVATED ++++.', evt);
    });

//fetch event
self.addEventListener('fetch', evt => {
    console.log('....service worker FETCHING something....', evt);
    evt.respondWith(
		caches.match(evt.request)
			.then(function(response) {
				if(response) {
					console.log('fetch worked', evt);
					return response;
				} else {
					console.log('fetch not worked', evt);
					return fetch(evt.request);
				}
			})
		);
    });
    

//+++++ BACKGROUND SYNC +++++
// This is for BackgroundSync where we store form data from PERSON REGISTRAION page, for example,
// that is then sent when back online.
// If we are online then this will run immediately.



var name;
var reply;


//importScripts('scripts/js/idb-init.js');
    
//Now service worker listen the SEND event just like it intercepts fetch event, it will also intercept sync event (when browser comes back online)
self.addEventListener("sync", function (event) {
	
	//it looks for any custom event named fs_person_registration_sync_tag being queued
	if (event.tag == "fs_person_registration_sync_tag") { // listen for the person-registration(field-survey) form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_person_registration_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
		/*event.waitUntil(
		    readAllData('fs_person_registration_sync')
		    .then()
		    .catch()
		    )		*/
		    
		// get data
		// send data
		// get response from posting
		// handle response
		// send message and notification
		// delete data from FORM-DATA table 
		
			/*getData('fs_person_registration_sync', 'fs_person_id').then(function (val) {
			console.log('val is ', val);
			name = val.name;
			category = val.category;
			subject = val.subject;
			message = val.message;
			reply = name + ':' + category + ':' + subject + ':' + message;
			console.log('POSTED DATA WILL BE: ', reply);
			});*/
	}
	

	
	
	
	//it looks for any custom event named fs_cancer_screening_sync_tag being queued
/*	if (event.tag == "fs_cancer_screening_sync_tag") { // listen for the cancer_screening form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_cancer_screening_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
	}
	
	
	//it looks for any custom event named fs_oral_cancer_screening_sync_tag being queued
	if (event.tag == "fs_oral_cancer_screening_sync_tag") { // listen for the oral_cancer_screening form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_oral_cancer_screening_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
	}
	
	
	//it looks for any custom event named fs_breast_cancer_screening_sync_tag being queued
	if (event.tag == "fs_cervical_cancer_screening_sync_tag") { // listen for the cervical_cancer_screening form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_cervical_cancer_screening_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
	}
	
	
	//it looks for any custom event named fs_breast_cancer_screening_sync_tag being queued
	if (event.tag == "fs_breast_cancer_screening_sync_tag") { // listen for the breast_cancer_screening form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_breast_cancer_screening_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
	}
	
	
	//it looks for any custom event named fs_common_cancer_screening_sync_tag being queued
	if (event.tag == "fs_common_cancer_screening_sync_tag") { // listen for the common cancer screening form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_common_cancer_screening_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");
	}*/				
});    


/*function getData(table, id) {
	return dbPromise.then(function (db) {
		var tx = db.transaction(table, "readonly");
		var dbTable = tx.objectStore(table);
		return dbTable.get(id);
	});
}*/
    
//comment today
/* ---- const cacheName = "app-shell-rsrs-v2";
const dynamicCacheName = "dynamic-cache-v1";
const assets = [
    '/',
    'http://localhost:8080/DigiPathoFS/',
    'FSLogin.html'    
    
];  ---- */



/*/const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name,size))
            }
        })
    })
}



//activate
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated.');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete()))
        })
    )
})/*/

/* ---- self.addEventListener('install', (e) => {
	  console.log('[Service Worker] Install');
	  e.waitUntil((async () => {
	    const cache = await caches.open(cacheName);
	    console.log('[Service Worker] Caching all: app shell and content');
	    await cache.addAll(assets);
	  })());
	});


self.addEventListener('fetch', (e) => {
	//console.log(`[Service Worker] Fetched resource ${e.request.url}`);
	
	e.respondWith((async () => {
		
		const response = await fetch(e.request);
	    
	    const cache = await caches.open(cacheName);
	    
	    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
	    
	    cache.put(e.request, response.clone());
	    
	    
	    const r = await caches.match(e.request);
	    
	    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
	    
	    if (r) 
	    { 
	    	return r; 
	    }
	    
	    
	    
	    return response;
	  })());
	
}); ---- */


/*
addEventListener('fetch', function(event) {
	console.log(`[Service Worker] Fetched resource ${event.request.url}`);
	
	  event.respondWith(
	    caches.match(event.request)
	      .then(function(response) {
	        if (response) 
	        {
	        	console.log('from cache!!');
	          return response;     // if valid response is found in cache return it
	        } 
	        else 
	        {
	        	console.log(`[Service Worker] Not in cache.. ${event.request.url}`);
	        	
	          return fetch(event.request)     //fetch from internet
	            .then(function(res) {
	              return caches.open(CACHE_DYNAMIC_NAME)
	                .then(function(cache) {
	                  cache.put(event.request.url, res.clone());    //save the response for future
	                  return res;   // return the fetched data
	                })
	            })
	            .catch(function(err) 
	            {       // fallback mechanism
	              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
	                .then(function(cache) {
	                  return cache.match('/offline.html');
	                });
	            });
	        }
	      })
	  );
	});     

*/

//importScripts('scripts/js/idb-init.js');