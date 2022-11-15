// import { uid } from './uid.js';
 //console.log(uid());
//nothing else to import because we are using the built in methods
//https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase

/*const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('PatientDB', 6);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });
  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success', db);
  });
  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    if (!db.objectStoreNames.contains('patientStore')) {
      objectStore = db.createObjectStore('patientStore', {
        keyPath: 'id',
      });
    }
    // db.createObjectStore('foobar');
    if (db.objectStoreNames.contains('foobar')) {
      db.deleteObjectStore('foobar');
    }
  });

  document.patientForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked
  });
})();*/

/*import { uid } from './uid.js';
console.log(uid());
//nothing else to import because we are using the built in methods
//https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase

const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('PatientDB', 8);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });
  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success', db);
  });
  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    if (!db.objectStoreNames.contains('patientStore')) {
      objectStore = db.createObjectStore('patientStore', {
        keyPath: 'id',
      });
    }
  });

  document.patientForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked

	let bleeding1 = document.getElementById('bleeding1').checked;
	let discharge1 = document.getElementById('discharge1').checked;
	let discharge2 = document.getElementById('discharge2').checked;
	let mens1 = document.getElementById('mens1').checked;
	let bleeding2 = document.getElementById('bleeding2').checked;
	let weight = document.getElementById('weight').checked;
	
    let patient = {
      id: uid(),
	  bleeding1,
	  discharge1,
	  discharge2,
	  mens1,
	  bleeding2,
	  weight
    };

    let tx = makeTX('patientStore', 'readwrite');
    tx.oncomplete = (ev) => {
      console.log(ev);
      //buildList()
    };

    let store = tx.objectStore('patientStore');
    let request = store.add(patient);

    request.onsuccess = (ev) => {
      console.log('successfully added an object');
    };
    request.onerror = (err) => {
      console.log('error in request to add');
    };
  });

  function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
      console.warn(err);
    };
    return tx;
  }
})();*/