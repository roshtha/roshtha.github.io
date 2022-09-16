			//check if the sw is supported by the browser
			if ('serviceWorker' in navigator) {                   //app.js file 
			    //navigator.serviceWorker.register('/sw.js')
			     navigator.serviceWorker.register('sw.js')  //promise 
			    //navigator.serviceWorker.register(href = '/sw.js', { scope: '/' })
			    //navigator.serviceWorker.register(href = 'sw.js', { scope: '/views/digipathofs' })
			    .then((reg) => console.log('service worker REGISTERED', reg))       //if the promise returns something then print this message
			    .catch((err) => console.log('service worker NOT REGISTERED', err))	//othewise catch the error and print this message
			}