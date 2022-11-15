//The code is for: User Authentication in Login page

console.log("inside authjs");
/*const db = new Dexie("UserDB");
   db.version(1).stores({
     users: 'id,Username, Password'
   });
  
   db.users.bulkAdd([
   {
     id: 1, Username: 'Admin', Password: 'admin'
   },
   {
     id: 2, Username: 'Sachin', Password: 'sachin'
   }
   ]);
  */
 
 
 			//Log DB details -- opens an existing database as is
			
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
			  
 //authenticate users 
   async function authen() {
    console.log("inside authen!!");
    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;

    const MainUser = await db.fs_users.where({login_id: u, login_password: p}).toArray();
    console.log(MainUser);
    console.log(MainUser.length);
   
    if(MainUser.length == 1)
    {
      console.log("matched!!");
      document.location.href="MainPage.html"; 
    }
    if(MainUser.length == 0)
    {
      console.log("not matched!!!");
      //alert("Incorrect Credentials!! Please try again.");
      /*username.style.border = "1px solid red";
      password.style.border = "1px solid red";
      credentials_error.style.display = "block";
      username.focus();
      password.focus();*/
    }
   //console.log(u);
   //console.log(p);  
  }