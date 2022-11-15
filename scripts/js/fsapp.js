//Field-Survey/Screening Survey JS Page


// import { uid } from './uid.js';
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

//import { uid } from './uid.js';
//console.log(uid());

//nothing else to import because we are using the built in methods
//https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase

/*const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('PatientDB', 5);

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

    let name = document.getElementById('name').value.trim();
    let dob = document.getElementById('dob').value.trim();
    let yearinput = parseInt(document.getElementById('yearinput').value);
    let monthinput = parseInt(document.getElementById('monthinput').value);
	let sex = document.getElementById('sex').value;
	let mstatus = document.getElementById('mstatus').value;
    let mobile = document.getElementById('mobile').value.trim();
    let house = document.getElementById('house').value.trim();
    let aadhaar = document.getElementById('aadhaar').value.trim();
    let ward = document.getElementById('ward').value.trim();
    let panchayath = document.getElementById('panchayath').value.trim();
	let district = document.getElementById('district').value;
	let state = document.getElementById('state').value;
    let country = document.getElementById('country').value.trim();
    let pin = document.getElementById('pin').value.trim();

    let patient = {
      id: uid(),
      name,
      dob,
      yearinput,
      monthinput,
	  sex,
	  mstatus,
      mobile,
      house,
      aadhaar,
      ward,
      panchayath,
	  district,
	  state,
      country,
      pin
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
})();
*/

/*
	new Dexie("DigiPathoFSDB")
	  .open()
	  .then(function (db) {
	    console.log("Found database: " + db.name);
	    console.log("Database version: " + db.verno);
	    db.tables.forEach(function (table) {
	      console.log("Found table: " + table.name);
	      console.log("Table Schema: " + JSON.stringify(table.schema, null, 4));
	    });
	  })
	  .catch("NoSuchDatabaseError", function (e) {
	    // Database with that name did not exist
	    console.error("Database not found");
	  })
	  .catch(function (e) {
	    console.error("Oh uh: " + e);
	  });
	


const IDB = (function init() {
  document.personForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked

    let name = document.getElementById('name').value.trim();
    let dob = document.getElementById('dob').value.trim();
    let yearinput = parseInt(document.getElementById('yearinput').value);
    let monthinput = parseInt(document.getElementById('monthinput').value);
	let sex = document.getElementById('sex').value;
	let mstatus = document.getElementById('mstatus').value;
    let mobile = document.getElementById('mobile').value.trim();
    let house = document.getElementById('house').value.trim();
    let aadhaar = document.getElementById('aadhaar').value.trim();
    let ward = document.getElementById('ward').value.trim();
    let panchayath = document.getElementById('panchayath').value.trim();
	let district = document.getElementById('district').value;
	let state = document.getElementById('state').value;
    let country = document.getElementById('country').value.trim();
    let pin = document.getElementById('pin').value.trim();

    let person = {
      id: uid(),
      name,
      dob,
      yearinput,
      monthinput,
	  sex,
	  mstatus,
      mobile,
      house,
      aadhaar,
      ward,
      panchayath,
	  district,
	  state,
      country,
      pin
    };

    let tx = makeTX('fs_person_registration', 'readwrite');
    tx.oncomplete = (ev) => {
      console.log(ev);
      //buildList()
    };

    let store = tx.objectStore('fs_person_registration');
    let request = store.add(person);

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
})();
*/

	/*new Dexie("DigiPathoFSDB")
	  .open()
	  .then(function (db) {
	    console.log("Found database: " + db.name);
	    console.log("Database version: " + db.verno);
	    db.tables.forEach(function (table) {
	      console.log("Found table: " + table.name);
	      console.log("Table Schema: " + JSON.stringify(table.schema, null, 4));
	    });
	  })
	  .catch("NoSuchDatabaseError", function (e) {
	    // Database with that name did not exist
	    console.error("Database not found");
	  })
	  .catch(function (e) {
	    console.error("Oh uh: " + e);
	  });
*/
	  
/*let btnClear = document.querySelector('clearBtnID');
let inputs = document.querySelectorAll('input');

btnClear.addEventListener('click', () => {
    inputs.forEach(input => input.value = '');  //clear for empty string
})	  */