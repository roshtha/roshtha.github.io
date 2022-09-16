import axios from 'axios';


function showAlert() {
	console.log('show');
	
}


function getUsers() {
	
	var Global_id = 'http://117.221.20.184:8080/DigiPathoGlo';
	
	var params = {};
	
	params["hospital_id"] = 'HS55';
	params["role_id"] = 'RL221';
	params["application_id"] = 'CF221';
	
	
	
	var pdata = {};
	pdata['data']= JSON.stringify(params);
	console.log('remote url:' + Global_id+'/Rest/usermanagementservice/readuserlist_global');
	axios
        .get(Global_id+'/Rest/usermanagementservice/readuserlist_global')
        .then((response) => {
        		console.log(JSON.stringify(response));
            const dbOpenRequest = indexedDB.open('DigiPathoFSDB', 2);
            
            dbOpenRequest.onupgradeneeded = function (event) {
                const db = event.target.result;
                db.createObjectStore('userStore', { keyPath: 'id' });
            };
            
            dbOpenRequest.onsuccess = function (event) {
                const db = event.target.result;
                const txn = db.transaction('userStore', 'readwrite');
                const store = txn.objectStore('userStore');
                const clearRequest = store.clear();
                clearRequest.onsuccess = function () {
                    response.data.forEach((usr) => {
                        store.add(usr);
                    });
                };
            };
            //setHospitals(response.data);
        })
	
}


/*
define('userMgmtJs',['jqueryutils','main_Page','select2full','fselect'],function(utils,mainPage,select2full,fselect){
	var Global_id = 'http://117.221.20.184:8080/DigiPathoGlo';
	var getUsers = function()
	{
		var params = {};
		
		params["hospital_id"] = 'HS55';
		params["role_id"] = 'RL221';
		params["application_id"] = 'CF221';
		
		
		
		var pdata = {};
		pdata['data']= JSON.stringify(params);
		
		utils.postDataCORS(Global_id+'/Rest/usermanagementservice/readuserlist_global',pdata,null,successUserList,errUserList);
	}
	
	function successUserList(result)
	{
		console.log('successUserList=' + result);
	}
	
	function errUserList(err)
	{
		console.log('errUserList=' + err);
	}
	
	return{
		getUsers:getUsers
		
	  }
});
*/