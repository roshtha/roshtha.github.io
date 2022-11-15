 //import { uid } from './uid.js';
// console.log(uid());
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
  let DBOpenReq = indexedDB.open('PatientDB', 7);

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

	let sores = document.getElementById('sores').checked;
	let spots = document.getElementById('spots').checked;
	let openm = document.getElementById('openm').checked;
	let teeth = document.getElementById('teeth').checked;
	
    let patient = {
      id: uid(),
	  sores,
	  spots,
	  openm,
	  teeth
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