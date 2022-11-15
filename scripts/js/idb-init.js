/**
 * 
 */
 //importScripts('../dexie/dexie.min.js');
 //importScripts('../dexie/dexie.js');
 
 	var db = new Dexie("DigiPathoFSDB");
	
	

	
	// Define Database Schema
	db.version(1).stores({
	  fs_users: "global_user_id, user_id, login_id, login_password, title, first_name, middle_name, last_name, sex, email, mobile_no, alternate_mobile_no, landline_no_off, landline_no_residence, address, city_or_town, district_id, state_id, postal_code, hospital_id, role_ids, theme_id, created_by_user_id, edited_by_user_id, created_date_time, approved_status, is_valid, designation", 
	  //other fields for data insert - title, first_name, middle_name, last_name, sex, email, mobile_no, //similar to structure of mas_users
	  fs_person_registration: "fs_person_id, global_fs_person_id, fs_inst_id, person_name, dob, age, gender, marital_status, mobile_no, house_name, aadhaar_no, ward_id, panchayath_id, district_id, state_id, country_id, pincode, user_id, created_date, is_valid",
	  fs_person_registration_sync: "fs_person_id, global_fs_person_id, fs_inst_id, person_name, dob, age, gender, marital_status, mobile_no, house_name, aadhaar_no, ward_id, panchayath_id, district_id, state_id, country_id, pincode, user_id, created_date, is_valid", 
	  //fs_cancer_screening: "++id, title, date, *items",
	  fs_cancer_screening: "++fs_cancer_id, global_fs_person_id, fs_person_id, global_fs_cancer_id, fs_inst_id, education_id, job_id, monthly_income, food_habits, cancer_patient, serious_illness, cancer_death, registered_atrcc, smoke, tobacco, alcohol, user_id, created_date, is_valid",
	  fs_cancer_screening_sync: "++fs_cancer_id, global_fs_person_id, fs_person_id, global_fs_cancer_id, fs_inst_id, education_id, job_id, monthly_income, food_habits, cancer_patient, serious_illness, cancer_death, registered_atrcc, smoke, tobacco, alcohol, user_id, created_date, is_valid",
	  
	  fs_common_cancer_screening: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, vomiting_blood, stool_blood, abdominal_issue, rapid_weight_loss, abnormality_present, skin_problem, continuous_noise, is_curl, orifices_bleeding, user_id, created_date, is_valid",
	  fs_common_cancer_screening_sync: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, vomiting_blood, stool_blood, abdominal_issue, rapid_weight_loss, abnormality_present, skin_problem, continuous_noise, is_curl, orifices_bleeding, user_id, created_date, is_valid",
	  
	  fs_oral_cancer_screening: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, are_sores, are_spots, open_mouth, teeth_growth, user_id, created_date, is_valid",
	  fs_oral_cancer_screening_sync: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, are_sores, are_spots, open_mouth, teeth_growth, user_id, created_date, is_valid",
	  
	  fs_breast_cancer_screening: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, skin_difference, lumps_present, is_swollen, discharge_abnormality, is_pain, is_enlarged, is_palpable, user_id, created_date, is_valid",
	  fs_breast_cancer_screening_sync: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, skin_difference, lumps_present, is_swollen, discharge_abnormality, is_pain, is_enlarged, is_palpable, user_id, created_date, is_valid",
	  
	  fs_cervical_cancer_screening: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, is_bleeding, discharge_smell, discharge_time, are_corpses, bleeding_time, low_weight, user_id, created_date, is_valid",
	  fs_cervical_cancer_screening_sync: "++fs_person_id, global_fs_person_id, fs_cancer_id, global_fs_cancer_id, fs_inst_id, is_bleeding, discharge_smell, discharge_time, are_corpses, bleeding_time, low_weight, user_id, created_date, is_valid",
	  
	  //friends: "++id, name, age, isCloseFriend",
	  //notes: "++id, title, date, *items"
	  
	  
	});

	db.open().catch (function (err) {
		console.error('Failed to open db: ' + (err.stack || err));
	});
	
	//Log DB details -- opens an existing database as is
	
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
	  });*/

/*	  function getData(table, id) {
	return dbPromise.then(function (db) {
		var tx = db.transaction(table, "readonly");
		var dbTable = tx.objectStore(table);
		return dbTable.get(id);
	});
}*/