//SERVICE WORKER IS A BIG EVENT LISTENER FILE

console.log('service worker inside sw.js');  //checking sw.js installed or not


//importScripts('scripts/js/idb.js');
//importScripts('scripts/js/idb-fn.js');
//importScripts('scripts/js/idb-init.js');

//var cacheName = 'cache-v4';

//Files to save in cache
/*var files = [
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
					'scripts/dexie/dexie.min.js',
  					'manifest.json'
];	    */

//Adding `install` event listener
self.addEventListener('install', (event) => {
  console.log('[Service Worker]: Installing Service Worker', event);

  event.waitUntil(
    caches.open('static')
    .then(function(cache){
		console.log('[Service Worker] precaching app shell', event);
		/*cache.add('/');
		//cache.add('/DigiPathoFS/FSLogin.html');
		cache.add('FSLogin.html');	
		cache.add('scripts/js/app.js');
		cache.add('scripts/assets/css/Login.css');*/
		cache.addAll([
					'/',
					'FSLogin.html',
					'MainPage.html', 
					'FieldSurvey.html',
					'Menu.html',
					'ScreeningSurvey.html',
					'Oral.html',
					'Cervical.html',
					'Breast.html',
					'Others.html',
					'Overview.html',
					'scripts/js/app.js',	
					'scripts/js/tableManager.js',
					'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
					'scripts/dexie/dexie.js',
					'scripts/dexie/dexie.min.js',				
					'scripts/assets/css/Login.css',
					'scripts/assets/css/style.css',
					'scripts/assets/css/MPstyle.css',
					'scripts/assets/css/MainPageStyle.css',
					'scripts/assets/icon/themify-icons/themify-icons.css',
					'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
					'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
					'scripts/assets/css/FieldSurvey.css',
					'scripts/assets/css/Menu.css',
					'scripts/assets/css/ScreeningSurvey.css',
					'scripts/assets/css/Oral.css',
					'scripts/assets/css/Cervical.css',
					'scripts/assets/css/Breast.css',
					'scripts/assets/css/Others.css',
					'scripts/assets/css/Overview.css',
					'views/digipathofs/images/search.png',
					'scripts/assets/images/user.png',
					'views/digipathofs/images/dctcfslogo.png',
					'scripts/assets/images/cdac2.png'
					

				]);
	})
  );
});

//Adding `install` event listener
/*self.addEventListener('install', (event) => {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      })
    })
  );
});*/ 
    
//install service worker
/*self.addEventListener('install', evt => {
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
				/*cache.add('/');                       // By default it takes this path - /
				cache.add('FSLogin.html');			// By default it takes this path, we don't need to write /DigiPathoFS/-  /DigiPathoFS/FSLogin.html
				cache.add('scripts/js/app.js');*/  //	By default it takes this path, we don't need to write /DigiPathoFS/-  /DigiPathoFS/scripts/js/app.js  
			/*})
		)
    });*/
    
 
	/*self.addEventListener('install', (evt) => {
	  console.log('[Service Worker] Install');
	  evt.waitUntil((async () => {
	    const cache = await caches.open('FSCache');
	    console.log('[Service Worker] Caching all: app shell and content');
	    await cache.addAll([
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
	  })());
	});*/
	



//activate service worker
self.addEventListener('activate', evt => {
    console.log('++++ service worker ACTIVATED ++++.', evt);
    return self.clients.claim();
    });

//fetch event
self.addEventListener('fetch', evt => {
    console.log('....service worker FETCHING something....', evt);
    //evt.respondWith(fetch(evt.request));
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



//var name;  // 24nov commented 
//var reply; // 24nov commented 


//importScripts('scripts/js/idb-init.js');
    
//Now service worker listen the SEND event just like it intercepts fetch event, it will also intercept sync event (when browser comes back online)
/*self.addEventListener("sync", function (event) {  // 24nov commented 
	
	//it looks for any custom event named fs_person_registration_sync_tag being queued
	if (event.tag == "fs_person_registration_sync_tag") { // listen for the person-registration(field-survey) form custom event - there may be others
		console.log("===== in serviceWorker =====");
		console.log(event);
		console.log("fs_person_registration_sync_tag (THE SYNC TAG) heard");
		console.log("Sending form data...");*/  // 24nov commented 
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
	//}	 // 24nov commented 
	

	
	
	
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
//});    // 24nov commented 


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