/**
 * 
 */

define('jqueryutils',['jquery','jqueryserialize','jqueryloadjson','string','jqueryi18','jqueryui/dialog','jqueryui/progressbar','jquery_session','blockUI','aesutils','crypto/crypto-js'],function($,serial,loader,S,i18,dia,progressbar,sessionJS,blockUI,aesutil,CryptoJS){	 
	var token;
	var initPhrase;
	var lstatus;
	var jqtokenutils='tok1';
	var URL_PARAMETERS;

	$.expr[":"].containsi = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            };
        });
        
	var process = function(chk)
	{
		if(chk)
			token = chk;
		else
			{
				token = $('#chk_cont').val();			
			}
		$('#chk_cont').remove();
	}

	var getInitPhrase = function()
	{
		return initPhrase;
	}
	
	var setInitPhrase = function()
	{
		initPhrase = $('#initSID').val();
		$('#initSID').remove();
	}
	
	var getLStatus = function()
	{
		return lstatus;
	}
	
	var setLStatus = function()
	{
		lstatus = $('#lstatus').val();
		$('#lstatus').remove();
	}
	/**
	 * Function to convert data in form inputs to json format for ajax requests. The key of the json object shall be the name
	 * attribute of the html tag and value of JSON object shall be the value of the field. For checkboxes value shall be either
	 * true or false based on whether they are selected or not.
	 *  
	 * @method formtoJSON
	 * @param formname {String} id of the form tag of which the values of input fields are to be converted to JSON format
	 * @return {JSON} Object containing key-value pairs 
	 */
	var formToJSON = function(formname)
	{
		var jsonObj;
		var param_names = ''; var cnt = 0;;
		$('#'+formname+' input[type=checkbox]:not(:checked)').val(0);
		  
		  $('#'+formname+' input[type=checkbox]:checked').val(1);
		  jsonObj = $('#'+formname).serializeJSON();
		 $('#'+formname+' input[type=checkbox]:not(:checked)').each(function(indx){
			 jsonObj[$(this).prop('name')]='0'; 
		  });
		 
		  for(var i in jsonObj){param_names +=(cnt==0?i:','+ i) ; cnt++;}
		  jsonObj['param_names'] = param_names;
		  return jsonObj;
	};
	
	var toJSON = function(divid,returnJSON)
	{
	 var jsonObj;
	 if(returnJSON != null)
		 jsonObj = returnJSON;
	 else
		 jsonObj = {};
	 var jsonId;
	  $('#'+divid+' input[type=text]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('id');
			  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' input[type=hidden]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('id');
			  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' textarea').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
	  	jsonId = $(this).attr('id');
	  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' select').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
	  	jsonId = $(this).attr('id');
	  	if($(this).val() != null)
	  	jsonObj[jsonId] = $(this).val();
	  	else
	  		jsonObj[$(this).attr('id')] = '';
	  		}
	  	});
	  $('#'+divid+' input[type=checkbox]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('id');
			  	jsonObj[jsonId] = $(this).is(':checked');
	  		}
	  	});
	  $('#'+divid+' input[type=radio]').each(function(id){
	  	jsonId = $(this).attr('name');
	  	if($(this).is(':checked'))
	  	jsonObj[jsonId] = $(this).val();
	  	});
  	console.log(JSON.stringify(jsonObj));
	  return jsonObj;
	};
	
	var resetFields = function(divid)
	{
		$('#'+divid+' input[type="text"]').each(function(id){
				$(this).val('');
	  	});
		$('#'+divid+' input[type="password"]').each(function(id){
			$(this).val('');
  	});
		$('#'+divid+' input[type="hidden"]').each(function(id){
			$(this).val('0');
  	});
	  $('#'+divid+' textarea').each(function(id){
	  		$(this).val('');
	  	});
	  $('#'+divid+' select').each(function(id){
	  		$(this).prop('selectedIndex', 0);
	  	});
	  $('#'+divid+' input[type=checkbox]').each(function(id){
	  	$(this).prop('checked',false);
	  	});
	  $('#'+divid+' input[type=radio]').each(function(id){
	  	$(this).prop('checked',false);
	  	});
	};
	
	var createMasterJSON = function(jsonStruct)
	{
		var jsonObj = {};
		for(var i=0;i<jsonStruct.columns.length;++i)
		 {
			if(jsonStruct.columns[i].fieldtype=='textfield' || jsonStruct.columns[i].fieldtype=='hidden' || jsonStruct.columns[i].fieldtype=='select' )
			jsonObj[jsonStruct.columns[i].dbcolname]=$('#'+jsonStruct.columns[i].fieldid).val();
			else if(jsonStruct.columns[i].fieldtype=='checkbox')
				jsonObj[jsonStruct.columns[i].dbcolname]=$('#'+jsonStruct.columns[i].fieldid).is(':checked')?1:0;
		 }	
		return jsonObj;
	};
	
	/**Function to load Data from JSON to Form Inputs**/
	var loadData = function(formname,data)
	{
		var camelCase = '';
		var ctrl;
	 	for(var i in data)
	 		{
	 		camelCase = S(i).camelize().s;
	 		if($('[name='+camelCase+']').is(':checkbox'))
	 				$('[name='+camelCase+']').attr('checked',data[i]==true);
	 		else
	 			$('[name='+camelCase+']').val(data[i]);
	 		}
	};
	

	/**Function to load Data from JSON to Form Inputs with the id specified in JSON**/
	var loadDataById = function(data)
	{		
		var nam;
	 	for(var i in data)
	 		{
	 		if($('#'+i).length >0)
	 			{
	 		if($('#'+i).is(':checkbox'))
	 			{
	 				$('#'+i).prop('checked',data[i]==true);
	 			}
	 		else if($('#'+i).is(':radio'))
	 			{
	 				nam = $('#'+i).prop('name');
	 				$('input:radio[name="'+nam+'"][value="'+data[i]+'"]').prop("checked",true)
	 			}
	 		else
	 			$('#'+i).val(data[i]);
	 		}
	 		else if($('input:radio[name="'+i+'"]').length>0)
	 			{
	 				$('input:radio[name="'+i+'"][value="'+data[i]+'"]').prop("checked",true)
	 			}
	 	}
	};

	var setTokenUtils = function(tu)
	{
	 jqtokenutils = tu;
	};
	
	var getTokenUtils = function()
	{
	  return jqtokenutils;
	};
	
	var preProcess = function(dat)
	{
		var params = {};
		var encjson = CryptoJS.AES.encrypt(JSON.stringify(dat), jqtokenutils.getToken(), { format: JsonFormatter });	
		params['encjson']=encjson.toString(); 
		return params;
	};

	var createAjaxParamUnEncrypted = function(aParam,cParam,refreshcache)
	{
		var ajaxParam = {};
		if(aParam != null)
			{
			 ajaxParam['data'] = html_sanitize(JSON.stringify(aParam));
			 //console.log(ajaxParam['data']);
			}
		else
			ajaxParam['data'] = '{}';
		if(cParam != null)
		{
		 ajaxParam['cache'] = JSON.stringify(cParam);
		}
		else
		  ajaxParam['cache'] = '[]';
		if(refreshcache != null && (refreshcache == true || refreshcache =='true'||refreshcache==1||refreshcache=='1'))
		ajaxParam['refresh']=1;
		else
			ajaxParam['refresh']=0;		
		return ajaxParam;
	}
	
	/**Function to create ajax parameter
	 * aParam = JSON object as key value pair where key is parameter name and 
	 * value is parameter value
	 * eg: {"user":"admin", "pass":"pword"};
	 * cParam = array of json data in cache,
	 * E.g ["states",'districts']
	 * */
	var createAjaxParam = function(aParam,cParam,refreshcache)
	{
		var ajaxParam = {};
		ajaxParam['data'] = JSON.stringify(aParam);
		
		return ajaxParam;
	}
	
	var createAjaxParamUnEncrypted = function(aParam,cParam,refreshcache)
	{
		var ajaxParam = {};
		if(aParam != null)
			{
			 ajaxParam['data'] = sanitizeHtml(JSON.stringify(aParam));
			 
			 //console.log(ajaxParam['data']);
			}
		else
			ajaxParam['data'] = '{}';
		if(cParam != null)
		{
		 ajaxParam['cache'] = JSON.stringify(cParam);
		}
		if(refreshcache != null && (refreshcache == true || refreshcache =='true'||refreshcache==1||refreshcache=='1'))
		ajaxParam['refresh']=1;
		else
			ajaxParam['refresh']=0;		
		return ajaxParam;
	}
	
	
	//added by asha 6/3/2019 for creating cookie for csrf security
	/*const createCookie = (a) => {
		  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e16] + 1e16).replace(/[01]/g, createCookie)
		};*/
		var createCookie = function(a)
		{
			return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e16] + 1e16).replace(/[01]/g, createCookie);
			
		};
		
	var postDataCORS = function(serverURL,aParam,cParam,fn_success,fn_error,is_request_body,refreshconfig){
	
		var ajaxData = createAjaxParam(aParam,cParam,refreshconfig);
				

       var headers = {
			  'Content-Type': 'application/json'
			};    
		if(serverURL.indexOf('.node')>-1)
			{
			
			$.ajaxSetup({headers:{'X-Csrf-Token':$('#_csrf').val()}});	
			showWait();		
			$.ajax({
				url : serverURL,
				data : ajaxData,
				type : 'POST',
				beforeSend : function(xhr) { 
	      		// set header if JWT is set
	      		if (jqtokenutils.getToken()) 
	      		{ 
	          		xhr.setRequestHeader("Authorization", "Bearer " +  jqtokenutils.getToken());
	      		}
	    	   },
				success : function(rslt,status,xhr){
				closeWait();	
				var result = postProcess(rslt);
					if(result!= null && result.sessionexpired ==null)
					{				
					 if(result.csrfToken)
					   {
					    console.log('ajax csrf token '+result.csrfToken);
					    $('#_csrf').val(result.csrfToken);
					   }	
					 fn_success(result,status,xhr);
					}
					 else if(result!= null && result.sessionexpired !=null && result.sessionexpired==1)
							window.open('/','_self');	 
				},
					
				error : fn_error,
				dataType : 'JSON'		
			
			});
			}
		   else
			{
			  // $.blockUI();
			   
			   $('#blockUI').block({ 
					baseZ:45000,
			        message: $('.ball-scale'), //<h1>Processing</h1>'
			        //css: { border: '3px solid #a00' } 
			    });
			   
		
			   
			   //editing by asha for including csrf token for double cookie submit token for csrf security
			   console.log('.node else part ' +serverURL);
			   
			   //Create cookie
			   const cookie = createCookie();
			   document.cookie = 'CSRF_TOKEN' + '=' + cookie;
			   $.ajax({
			     url:  serverURL+'?'+$.param(aParam),
			     dataType: 'json',
			     contentType: "application/json",
			     crossDomain: true,
			     xhrFields: {
			       withCredentials: true
			     },
			     //headers: {'X-CSRF-TOKEN': cookie},
			     type: "POST",
			     data: ajaxData,
			     success : function(rslt,status,xhr){

			    	
			    	 
                     if (status=="parsererror")

                     {
                    	// alert(status)
                    	 
                    	 $("#blockUI").unblock();
                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

						$("#blockUI").unblock();
						//alert('call ..' + fn_success);
						fn_success (rslt,status,xhr);

                                

                     }

                    },                  

                    error : function(xhr, status, error)

                    {

                    if (status=="parsererror")

                     {

                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

                                  fn_error(xhr, status, error)

                     }

                    }

                
						
			   });
		    
			   sessionJS.sessionTimeout({
				   warnAfter: 1500000, // 25 minutes,
				   redirAfter: 1800000 // 30 minutes
				    			
							
				    });
			
			}

		
		
	};
	

	var postData = function(serverURL,aParam,cParam,fn_success,fn_error,is_request_body,refreshconfig){
	
		var ajaxData = createAjaxParam(aParam,cParam,refreshconfig);
				

       var headers = {
			  'Content-Type': 'application/json'
			};    
		if(serverURL.indexOf('.node')>-1)
			{
			
			$.ajaxSetup({headers:{'X-Csrf-Token':$('#_csrf').val()}});	
			showWait();		
			$.ajax({
				url : serverURL,
				data : ajaxData,
				type : 'POST',
				beforeSend : function(xhr) { 
	      		// set header if JWT is set
	      		if (jqtokenutils.getToken()) 
	      		{ 
	          	xhr.setRequestHeader("Authorization", "Bearer " +  jqtokenutils.getToken());
	      		}
	    	   },
				success : function(rslt,status,xhr){
				closeWait();	
				var result = postProcess(rslt);
					if(result!= null && result.sessionexpired ==null)
					{				
					 if(result.csrfToken)
					   {
					    console.log('ajax csrf token '+result.csrfToken);
					    $('#_csrf').val(result.csrfToken);
					   }	
					 fn_success(result,status,xhr);
					}
					 else if(result!= null && result.sessionexpired !=null && result.sessionexpired==1)
							window.open('/','_self');	 
				},
					
				error : fn_error,
				dataType : 'JSON'		
			
			});
			}
		   else
			{
			  // $.blockUI();
			   
			   $('#blockUI').block({ 
					baseZ:45000,
			        message: $('.ball-scale'), //<h1>Processing</h1>'
			        //css: { border: '3px solid #a00' } 
			    });
			   
		
			   
			   //editing by asha for including csrf token for double cookie submit token for csrf security
			   console.log('.node else part ' +serverURL);
			   
			   //Create cookie
			   const cookie = createCookie();
			   document.cookie = 'CSRF_TOKEN' + '=' + cookie;
			   $.ajax({
			     url:  serverURL+'?'+$.param(aParam),
			     dataType: 'json',
			     contentType: "application/json",
			     crossDomain: true,
			     xhrFields: {
			       withCredentials: true
			     },
			     headers: {'X-CSRF-TOKEN': cookie},
			     type: "POST",
			     data: ajaxData,
			     success : function(rslt,status,xhr){

			    	
			    	 
                     if (status=="parsererror")

                     {
                    	// alert(status)
                    	 
                    	 $("#blockUI").unblock();
                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

                     $("#blockUI").unblock();

                  

                    
                     fn_success (rslt,status,xhr);

                                

                     }

                    },                  

                    error : function(xhr, status, error)

                    {

                    if (status=="parsererror")

                     {

                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

                                  fn_error(xhr, status, error)

                     }

                    }

                
						
			   });
		    
			   sessionJS.sessionTimeout({
				   warnAfter: 1500000, // 25 minutes,
				   redirAfter: 1800000 // 30 minutes
				    			
							
				    });
			
			}

		
		
	};
	
/*For Patient summary*/	
	
	var postDataSummary = function(serverURL,aParam,cParam,fn_success,fn_error,is_request_body,refreshconfig){
		
		var ajaxData = createAjaxParam(aParam,cParam,refreshconfig);
		
		var headers = {
			  'Content-Type': 'application/json'
			};    
		if(serverURL.indexOf('.node')>-1)
			{
			
			$.ajaxSetup({headers:{'X-Csrf-Token':$('#_csrf').val()}});	
			showWait();		
			$.ajax({
				url : serverURL,
				data : ajaxData,
				type : 'POST',
				beforeSend : function(xhr) { 
	      		// set header if JWT is set
	      		if (jqtokenutils.getToken()) 
	      		{ 
	          	xhr.setRequestHeader("Authorization", "Bearer " +  jqtokenutils.getToken());
	      		}
	    	   },
				success : function(rslt,status,xhr){
				closeWait();	
				var result = postProcess(rslt);
					if(result!= null && result.sessionexpired ==null)
					{				
					 if(result.csrfToken)
					   {
					    console.log('ajax csrf token '+result.csrfToken);
					    $('#_csrf').val(result.csrfToken);
					   }	
					 fn_success(result,status,xhr);
					}
					 else if(result!= null && result.sessionexpired !=null && result.sessionexpired==1)
							window.open('/','_self');	 
				},
					
				error : fn_error,
				dataType : 'JSON'		
			
			});
			}
		   else
			{
			  // $.blockUI();
			   
			   /*$('#blockUI').block({ 
					baseZ:45000,
			        message: $('.ball-scale'), //<h1>Processing</h1>'
			        //css: { border: '3px solid #a00' } 
			    });*/
			   
		
			   
			   //editing by asha for including csrf token for double cookie submit token for csrf security
			   console.log('.node else part ' +serverURL);
			   
			   //Create cookie
			   const cookie = createCookie();
			   document.cookie = 'CSRF_TOKEN' + '=' + cookie;
			   $.ajax({
			     url:  serverURL+'?'+$.param(aParam),
			     dataType: 'json',
			     contentType: "application/json",
			     crossDomain: true,
			     xhrFields: {
			       withCredentials: true
			     },
			     headers: {'X-CSRF-TOKEN': cookie},
			     type: "POST",
			     data: ajaxData,
			     success : function(rslt,status,xhr){

			    	
			    	 
                     if (status=="parsererror")

                     {
                    	// alert(status)
                    	 
                    	// $("#blockUI").unblock();
                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

                    // $("#blockUI").unblock();

                     fn_success (rslt,status,xhr);

                                

                     }

                    },

                   

                    //error : fn_error

                    error : function(xhr, status, error)

                    {

                    	

                    if (status=="parsererror")

                     {

                            alert ('Error in Session! Please Login again!')

                            window.location.href = '../../';

                     }

                     else

                     {

                                  fn_error(xhr, status, error)

                     }

                    }

						
			   });
		    
			   sessionJS.sessionTimeout({
				   warnAfter: 1500000, // 25 minutes,
				   redirAfter: 1800000 // 30 minutes
				    			
							
				    });
			
			}

		
		
	};
	
	/*For Patient summary --- end*/		

	var postImage= function(aParam,imagetype,fn_success,fn_error,is_request_body,refreshconfig){
	    //Image Type = png or gif or jpg
		showSession(true);
		if(is_request_body !=null  && (is_request_body == true || is_request_body =='true'||is_request_body==1||is_request_body=='1'))
			aParam['request_body'] = '1';
		
		var ajaxData = createAjaxParam(aParam,[],refreshconfig);
		var headers = {
			  'Content-Type': 'application/json'
			}; 
		showWait();
		
		if(imagetype == 'png' || imagetype == 'gif' || imagetype == 'jpg')
		{
		
		//$.ajaxSetup({headers:{'X-Csrf-Token':$('#_csrf').val()}});	
		
		$.ajax({
			url : '/'+imagetype,
			data : ajaxData,
			type : 'POST',
			beforeSend : function(xhr) { 
	      // set header if JWT is set
	      if (jqtokenutils.getToken()) 
	      		{
	          	xhr.setRequestHeader("Authorization", "Bearer " +  jqtokenutils.getToken());
	      		}

	    },
			success : function(rslt,status,xhr){			
				closeWait();
				if(fn_success)
				 fn_success(rslt,status,xhr);		
			},
				
			error : function(xhr, status, error)
				{ 
					closeWait();
					fn_error(xhr, status, error)
				},
			dataType : 'html'		
		
		});
	   }
	   else
	    alert('Please Provide image type');
	};
	
 	var postProcess = function(rslt)
 {
	 var result = {}; 
	 if(rslt['content'])
			{	
				
				var decrypted = CryptoJS.AES.decrypt(rslt['content'], jqtokenutils.getToken(), { format: JsonFormatter });
				// convert to Utf8 format unmasked data 
				var decrypted_str = CryptoJS.enc.Utf8.stringify(decrypted);
				result = JSON.parse(decrypted_str);						
			}
	 else
	  result = rslt;		
	 return result;
 }
	
	var loadComboWithJSONArray = function(comboId,jsonObj,key,val,checkboolean)
	{
		var add = true;
		$('#'+comboId).empty();
		$('#'+comboId).append('<option value="0">--Select--</option>');
		$.each(jsonObj,function(idx,ob){
			add = true;
			if(checkboolean !=null)
				{
			 if(checkboolean(ob))
				 $('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
			 else
				 $('#'+comboId).append('<option style="color:red;" disabled value="'+ob[key]+'">'+ob[val]+'</option>');
				}
			else
				$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
		});
	};
	var loadComboWithJSONArrayForSelectPatient = function(comboId,jsonObj,key,val,checkboolean)
	{
		var add = true;
		$('#'+comboId).empty();
		$('#'+comboId).append('<option value="0">All</option>');
	//	$('#'+comboId).append('<option value="1">All</option>');
		$.each(jsonObj,function(idx,ob){
			add = true;
			if(checkboolean !=null)
				{
			 if(checkboolean(ob))
				 $('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
			 else
				 $('#'+comboId).append('<option style="color:red;" disabled value="'+ob[key]+'">'+ob[val]+'</option>');
				}
			else
				$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
		});
	};
	var loadComboWithJSONArrayForHosp = function(comboId,jsonObj,key,val,checkboolean)
	{
		var add = true;
		$('#'+comboId).empty();
		/*$('#'+comboId).append('<option value="0">--Select--</option>');*/
		$.each(jsonObj,function(idx,ob){
			add = true;
			if(checkboolean !=null)
				{
			 if(checkboolean(ob))
				 $('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
			 else
				 $('#'+comboId).append('<option style="color:red;" disabled value="'+ob[key]+'">'+ob[val]+'</option>');
				}
			else
				$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
		});
	};
	var createCheckBoxesWithJSONArray = function(divId,jsonObj,key,val,checkboolean,fnToCall)
	{
		var add = true;
		$('#'+divId).empty();
		
		var str='';

		$.each(jsonObj,function(idx,ob){
			add = true;
			if(checkboolean !=null)
				{
					 if(checkboolean(ob))
						 {
						 //$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
		
						 str=str+'<div class="col-sm-12 col-xl-6 m-b-30">'
			                +'<div  class="border-checkbox-section">'
			                +'<div class="border-checkbox-group border-checkbox-group-primary">'
						 	+'<input class="border-checkbox" type="checkbox" id="'+ob[key]+'" value="'+ob[val]+'" onclick="'+fnToCall+';">'
						 	+'<label class="border-checkbox-label" for="'+ob[key]+'">'+ob[val]+'</label>'
						 	+'</div>'
						} 
					 	else
					 		{
					 		 str=str+'<div class="col-sm-4 ">'
				                +'<div class="border-checkbox-group border-checkbox-group-primary">'
							 	+'<input class="border-checkbox" type="checkbox" disabled id="'+ob[key]+'" value="'+ob[val]+'" onclick="'+fnToCall+';">'
							 	+'<label class="border-checkbox-label" for="'+ob[key]+'">'+ob[val]+'</label>'
							 	+'</div></div>';
					 		}
						 //$('#'+comboId).append('<option style="color:red;" disabled value="'+ob[key]+'">'+ob[val]+'</option>');
						 
				}
			else
				{
				str=str+'<div class="col-sm-3">'
                +'<div  class="border-checkbox-section">'
                +'<div class="border-checkbox-group border-checkbox-group-primary">'
			 	+'<input class="border-checkbox" type="checkbox" id="'+ob[key]+'" value="'+ob[val]+'" onclick="'+fnToCall+';">'
			 	+'<label class="border-checkbox-label" for="'+ob[key]+'">'+ob[val]+'</label>'
			 	+'</div></div></div>';
				}
				//$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');
		});
		$('#'+divId).append(str);
	};
	
	/*
	 * Function to get cache data from JSON response
	 * cacheName is the name with which data is cached (table name)
	 * */
	var getCacheData = function(respData,cacheName)
	{
	 if(respData != null)
		 if(respData['cache'] != null && respData['cache'][cacheName] != null)
		 return respData['cache'][cacheName];
		 else
			 return {};			 
	 else
		 return {};
	};
	
	var changeLanguage = function(lang)
	{
		$.i18n.properties({
	    name:'Messages', 
	    path:'i18n/', 
	    mode:'both',
	    language:lang, 
	    callback: function() {
	    	
	    	var label; 
	    	$('*[data-multi="1"]').each(function(){
	    		label = jQuery.i18n.prop($(this).data('label'));
	    		$(this).text(label);
	    		});
	    	
	    }
	});
	};
	
	var changeLanguageInEditPage = function(lang)
	{ 
		$.i18n.properties({
	    name:'Messages', 
	    path:'../i18n/', 
	    mode:'both',
	    language:lang, 
	    callback: function() {
	    	
	    	var label; 
	    	$('*[data-multi="1"]').each(function(){
	    		label = jQuery.i18n.prop($(this).data('label'));
	    		$(this).text(label);
	    		});
	    	
	    }
	});
	};
	
	var getPageParameters = function()
	{
		try
		{ 
		return JSON.parse($('#urlParameters').val());
		}
		catch(err)
		{
			return {};
			alert(err);			
		}
	};
	
	var setEditParameters = function(value)
	{
		try
		{ 
		  $("#editparams").val(value);
		}
		catch(err)
		{
			alert(err);
		}
	};
	
	var getEditParameters = function()
	{
		try
		{ 
			return JSON.parse($("#editparams").val());
		}
		catch(err)
		{
			return {};
			alert(err);		
		}
	};
	
	var openpage = function(url,params)
	{
		params['openurl'] = url;
		setEditParameters(JSON.stringify(params));
		
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = 0 
    	
    var top = 0;
  
    var newWindow = window.open('des/editor.html', '_editor', 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    if (window.focus) {
      newWindow.focus();
  }
	};
	
	
	var openPageByAjax = function(url,params,callback)
	{
		try
			 {
				 showSession(true);	 
				 showWait();
			 if($('#pagecontent').length>0)
				 {					
						
						
					$('#pagecontent').find('.dataTable').each(
							 function(idx,elem){							
								 $('#'+$(this).attr('id')).dataTable().api().destroy();											 
							 });		
					 	$('#pagecontent').find('.ui-accordion').each(
								 function(idx,elem){							
									 $('#'+$(this).attr('id')).accordion('destroy');
									 
								 });	
						$('#pagecontent').find('.ui-tabs').each(
								 function(idx,elem){							
									 $('#'+$(this).attr('id')).tabs('destroy');
									
								 });	
						 
						$('#pagecontent').remove();
				 }
				 $('#page').append('<div id="pagecontent"></div>');
				 if(url.indexOf('?')>-1)
			   url+= '&token='+jqtokenutils.getToken();
			 else
			   url+= '?token='+jqtokenutils.getToken();
				 $("#pagecontent").load(url,function(){
					 var label;				 
				    	$('*[data-multi="1"]').each(function(){
				    		label = jQuery.i18n.prop($(this).data('label'));
				    		$(this).text(label);
				    		}); 
				    	if(params != null)
				    	  $('#editparams').val(params);
				    	else
				    		$('#editparams').val('');
				    	closeWait();
				    	if(callback != null )
				    	callback();
					 });
				 
		 }
		 catch(err)
			 {
				 alert('Error '+err);
			 }
	}
	
	var keyPressNumeric = function(evt)
	{
		
		var code = evt.which;
		if(!(((code >=48 && code <=57) || code==0) || code==8))
			{
				evt.preventDefault();
				return false;
			}
	};
	function toTitleCase(ele) {//Converting to Title case / Camel case
		// alert ('value '+ele.value);
		 var cp_value=ele.value;
		 ele.value= cp_value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
	var validateInput = function(id)
	{
	 var isValid = true;
	 $('#'+id).find('input[type="text"][data-required="1"],textarea[data-required="1"],select[data-required="1"],input[type="radio"][data-required="1"]').each(function(){
		  
		
		  			if($(this).prop('tagName') == 'INPUT')
		  				{
		  				if($(this).val() == null || $(this).val() == '')
		  				{	
			  			if($(this).data('requiremessage') != null)
			  			 alert($(this).data('requiremessage'));
			  			else
			  				alert('Please enter value for field');
			  			isValid = isValid && false;
			  			return isValid;
		  				}
		  				}
		  			if($(this).prop('tagName') == 'INPUT' && ($(this).prop('attr') == 'radio' || $(this).prop('attr') == 'RADIO'))
		  				{		  				
		  				 var rname = $(this).attr('name');
		  				 if(rname != null)
		  					 {
		  						 if($('input[name='+rname+']:checked').length == 0)
		  							 {
		  								 if($(this).data('requiremessage') != null)
		  					  			 alert($(this).data('requiremessage'));
		  					  			else
		  					  				alert('Please enter value for field');
		  					  			isValid = isValid && false;
		  					  			return isValid;
		  							 }
		  					 }
		  				}
		  			else if($(this).prop('tagName') == 'SELECT')
		  				{
		  				if($(this).find('option').length==0 || $(this).prop('selectedIndex')==0)
		  				{	
			  			if($(this).data('requiremessage') != null)
			  			alert($(this).data('requiremessage'));
			  			else
			  				alert('Please enter value for field');
			  			isValid = isValid && false;
			  			return isValid;
		  				}
		  				}
		  		/*}*/
	 });	
	 return isValid;
	};
	
	var keyPressDecimal = function(evt)
	{
		
		var code = evt.which; //alert(code);
		if(!(((code >=48 && code <=57) || code==0) ||code==8|| code==46))
			{
				evt.preventDefault();				
				return false;
			}
		else if(code==46)
			{
				//console.log($(evt.target).val().indexOf('.'));
				if($(evt.target).val().indexOf('.')>-1)
					{
						evt.preventDefault();						
						return false;
					}
			} 
		return true;
	};
	
	var keyPressAlphabet = function(evt)
	{		
		var code = evt.which;
		if(!((evt.which >=65 && evt.which <=90)|| (evt.which>=97 && evt.which <=122) || code==0 || code==8))
			{
				evt.preventDefault();
				return false;
			} 
		return true;
	};
	
	var keyPressAlphabetLower = function(evt)
	{		
		//console.log(evt.which);
		
	  if (!((evt.which>=97 && evt.which <=122)|| evt.which==0|| evt.which==8))
	  	{
	  		evt.preventDefault();
	  		return false;
	  }
	   return true;
	};
	
	var keyPressAlphabetUpper = function(evt)
	{

	  if (!((evt.which>=65 && evt.which <=90)|| evt.which==0||evt.which==8))
	  	{
	  		evt.preventDefault();
	  		return false;
	  }
	  return true;
	};
	
	var keyPressAlphaNumeric = function(evt)
	{
		if (!((evt.which>=65 && evt.which <=90)||(evt.which>=97 && evt.which <=122)||(evt.which>=48 && evt.which <=57)|| evt.which==0|| evt.which==8))
	  	{
	  		evt.preventDefault();
	  		return false;
	  }
		return true
	};
	
	var keyPressAlphaNumericLower = function(evt)
	{
		if (!((evt.which>=97 && evt.which <=122)||(evt.which>=48 && evt.which <=57)|| evt.which==0 || evt.which==8))
	  	{
	  		evt.preventDefault();
	  		return false;
	  }
		return true;
	};
	
	var keyPressAlphaNumericUpper = function(evt)
	{
		if (!((evt.which>=65 && evt.which <=90)||(evt.which>=48 && evt.which <=57)|| evt.which==0 || evt.which==8))
	  	{
	  		evt.preventDefault();
	  		return false;
	  }
		return true;
	};
	
	var keyPressPrice = function(evt)
	{
		//console.log(evt.keyCode);
		var code = evt.which;
		if(!((code >=48 && code <=57)||code == 46 || code==8|| code == 0 || evt.which==8)) 
			{
				evt.preventDefault();
				return false;
			}
		else if(code >=48 && code <=57)
			{
				if($(evt.target).val().indexOf('.')>-1)
					{
						var idx = $(evt.target).val().indexOf('.');
						var len = $(evt.target).val().length;
						if($(evt.target).val().charAt(idx+2) !='')
							{
								evt.preventDefault();
								return false;
							}
					}
				//return false;
			}
		else if(code==46)
			{				
				if($(evt.target).val().indexOf('.')>-1)
					{
						evt.preventDefault();
						return false;
					}
				else if($(evt.target).val().length ==0)
				{
					evt.preventDefault();
					$(evt.target).val('0.');
					return false;
				}
			}
		 return true;
	};
	
	var toPDF = function(htmlId, config ){
		if( $('#'+htmlId).length > 0)
			{
				reportParameters['reportString'] = $('#'+htmlId).html();
				reportParameters['config'] = JSON.stringify(config);
				window.open('/des/report.html','reportPage','menubar=0,scrollbars=0,location=0,status=0,titlebar=0,toolbar=0');
			}
		else
			{
				alert('Invalid HTML ID');
			}
};

 var toExcel = function(htmlId)
 {
	 excelParameters['excelString'] = encodeURIComponent($('#'+htmlId).html());					
	 window.open('/des/excel.html','excelPage','menubar=0,scrollbars=0,location=0,status=0,titlebar=0,toolbar=0');
 };

 
	var getPermittedDistricts = function(districts,officepermits)  /**Parameters are district master array and offic permits array, return array of permitted district*/
	{
		var permittedDistricts = [];
		var addedEntries = {}
		 $.each(officepermits,function(i,permit){
			 /**If headoffice permit all districts**/
			 if(permit.head_office == 'true' || permit.head_office == true ||permit.head_office == 1)
				 {
					  $.each(districts,function(idx,dist){
				  	 if(dist.active==1 && addedEntries[dist.district_id] == null)
				  		 {
				  			 permittedDistricts.push(dist);
				  			 addedEntries[dist.district_id] = dist.district_id;
				  		 }
				   });
											
				 }
			 else
				 {
					 $.each(districts,function(idx,dist){
				  	 if(permit.district_id ==dist.district_id && dist.active==1 && addedEntries[dist.district_id] == null)
				  		 {
				  			 permittedDistricts.push(dist);
				  			 addedEntries[dist.district_id] = dist.district_id;
				  		 }
				   });					 			
				 } 					
		 });
		 return permittedDistricts;	
	};
	
	var getPermittedTaluks= function(taluk,districtId,off_permits)/**Parameters are taluk master array, districtid and offic permits array, return array of permitted taluks*/
		{
			var permittedTaluks = [];
			var addedEntries = {}
			 $.each(off_permits,function(i,permit){
				 if(permit.head_office == 'true' || permit.head_office == true ||permit.head_office == 1)
					 {
						 //$('#taluk').empty();
					   //$('#taluk').append('<option value="0">--Select--</option>');
					  // console.log('head office');
						 $.each(taluk,function(idx,tlk){
					  	 if(tlk.active==1 && tlk.district_id == districtId && addedEntries[tlk.taluk_id] == null)
					  		 {
					  			 permittedTaluks.push(tlk);
					  			 addedEntries[tlk.taluk_id] = tlk.taluk_id;
					  		 }
					   });						 						
					 }
				 else
					 {
						 if(permit.taluk_id != '' && permit.taluk_id>0)  /**is taluk office*/
							 {
								 $.each(taluk,function(idx,tlk){
							  	 if(permit.taluk_id ==tlk.taluk_id && tlk.active==1 && tlk.district_id == districtId && addedEntries[tlk.taluk_id] == null)
							  		 {
							  			 permittedTaluks.push(tlk);
							  			 addedEntries[tlk.taluk_id] = tlk.taluk_id;
							  		 }
							   });
							 }
						 else if(permit.district_id != '' && permit.district_id>0)  /**Is district office**/
							 {
								 $.each(taluk,function(idx,tlk){
							  	 if(tlk.active==1 && tlk.district_id == districtId && addedEntries[tlk.taluk_id] == null)
							  		 {
							  			 permittedTaluks.push(tlk);
							  			 addedEntries[tlk.taluk_id] = tlk.taluk_id;
							  		 }
							   });
							 }
					 }
			 });
			 return permittedTaluks;
		};
		
		var showSession = function(refresh)
		{
			var dt;
		 if(refresh)
			 {
				 startTime = new Date();
				 startTime.setMinutes(startTime.getMinutes()+45);
				 startTime.setSeconds(startTime.getSeconds()-5);
				 if(sessionTimer != undefined && sessionTimer != null)
					 {
					 window.clearInterval(sessionTimer);
					 console.log('Clear Timer');
					 }
				 sessionTimer = window.setInterval(function(){
			  	 getRemainingTime();
			   },1000);
			 }
		 else
			 sessionTimer = window.setInterval(function(){
		  	 getRemainingTime();
		   },1000);		 
		};
		
	var clearTimer = function()
	{
		 if(sessionTimer != null)
			 window.clearInterval(sessionTimer);
	}
		
  var getRemainingTime = function()
  {
  	var current_time = new Date().getTime();
  	var seconds_left = (startTime - current_time) / 1000;
  	var minutes = parseInt(seconds_left / 60);
  	var seconds = parseInt(seconds_left % 60);
    	$('#remainingSessionTime').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Session out in '+(minutes<10?('0'+minutes):minutes)+':'+(seconds<10?('0'+seconds):seconds));  
    	if(minutes == 0 && seconds == 0)
    		{
    		clearTimer();
    		window.open('/logout','_self');
    		}
  };
		
  
  var hideBlockedResources = function()
  {
  	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var treeNode = zTree.getSelectedNodes()[0];
		resources= treeNode.resources;
		 if(resources != null)
  			{
  				$.each(resources,function(id,rs){
  					console.log(rs +'  '+$('#'+rs).length);
  					if($('#'+rs).length==1)
  						{
  					 	 $('#'+rs).css('display','none');
  					 	console.log('kk '+rs);
  						}
  				});
  			}
  };
  
  var showWait = function(msg)
  {
  	/*
	$("#loadwaitdiv" ).dialog( "open" );
  	if(msg)
  		$('#loadingmsg').text(msg);
  		*/
  };
  
  var closeWait = function()
  {
  	//$("#loadwaitdiv" ).dialog( "close" );
  }
  
  var addToLogList = function(msg)
  {
  	$('#loglist').append('<li>'+msg+'</li>');
  };
  
  var showLogList = function()
  {
  	//$('#logdiv').dialog('open');
  };
  
  var getToken = function()
  {
   return token;	
  };
  
  var showBlankIfNull = function(ob)
  {
   if(ob === null || ob === undefined)
    return '';
   else
    return ob; 
  }
  
  var showBlankIfZero = function(ob)
  {
   if(ob === null || ob === undefined)
    return '';
   else if(ob == 0 || ob == '0')
    return '';
   else
    return ob;  
  }

  function setUrlParameters(urlParam)
  {
	  URL_PARAMETERS=urlParam;
  }
  function getUrlParameters()
  {
	  try
		{ 
		return JSON.parse(URL_PARAMETERS);
		}
		catch(err)
		{
			return {};
			alert('jqueryutil get URLParam '+err);			
		}
  }
  
  var nameToJSON = function(divid,returnJSON)
	{
	 var jsonObj;
	 if(returnJSON != null)
		 jsonObj = returnJSON;
	 else
		 jsonObj = {};
	 var jsonId;
	  $('#'+divid+' input[type=text]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('name');
			  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' input[type=hidden]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('id');
			  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' textarea').each(function(id){
	  	if($(this).attr('name') != null)
	  		{
	  	jsonId = $(this).attr('name');
	  	jsonObj[jsonId] = $(this).val();
	  		}
	  	});
	  $('#'+divid+' select').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
	  	jsonId = $(this).attr('name');
	  	if($(this).find('option:selected').text() != '--Select--')
	  		jsonObj[jsonId] = $(this).find('option:selected').text();
	  	else
	  		jsonObj[$(this).attr('name')] = '';
	  		}
	  	});
	  $('#'+divid+' input[type=checkbox]').each(function(id){
	  	if($(this).attr('id') != null)
	  		{
			  	jsonId = $(this).attr('id');
			  	jsonObj[jsonId] = $(this).is(':checked');
	  		}
	  	});
	  $('#'+divid+' input[type=radio]').each(function(id){
	  	jsonId = $(this).attr('name');
	  	if($(this).is(':checked'))
	  	jsonObj[jsonId] = $(this).val();
	  	});
	console.log(JSON.stringify(jsonObj));
	  return jsonObj;
	};
	
	/*
	var uploadImage= function(aURL,aParam,fn_success,fn_error){
		console.log('uploadFn');
		$.ajax({
	           type: 'POST',
	           enctype: 'multipart/form-data',
	           url: aURL,
	           data: aParam,
	           processData: false, //prevent jQuery from automatically transforming the data into a query string
	           contentType: false,
	           cache: false,
	           timeout: 600000,
	           
	           success: function (data) {
	        	   
	        	   var result=JSON.parse(data);
	        	   
	               console.log("SUCCESS : ", result);
	                              
	               if(result['o_result']=='SUCCESS')
		            	alert('Data Saved Successfully');
		            else
		            	alert('Data Saving failed - '+result['o_result']);
	               fn_success(result);	
	           },
	           error: function (e) {

	              console.log("ERROR : ", e);
	              fn_error(e);
	           }
	       });
		
	}
	*/
	
	var dataLabelToJSON = function(divid,returnJSON)

    {
            //  console.log('Inside dataLabelToJSON');
              var jsonObj;
              var currval;

           if(returnJSON != null)
        	   jsonObj = returnJSON;
           else

           jsonObj = {};

           var jsonId;

           $('#'+divid+' input[type=text]').each(function(id){

           if($(this).attr('id') != null)

                  {

        	   			jsonId = $(this).attr('data-label');
                         currval = '';
                         currval = $(this).val();
                         currval = currval.replace(/"/g,"'");//to replace double quotes to single quotes
                         currval = currval.replace(/'/g,'sq;');//to replace single quotes to sq;
                         //jsonObj[jsonId] = $(this).val().replace(/'/g,'sq;');
                         jsonObj[jsonId] = currval;

                  }
           });
 
      $('#'+divid+' input[type=hidden]').each(function(id){

       if($(this).attr('id') != null)

       {
             jsonId = $(this).attr('data-label');
             jsonObj[jsonId] = $(this).val();
       }
    });

      $('#'+divid+' textarea').each(function(id){
     
    	  if($(this).attr('id') != null)
           {
    		  			jsonId = $(this).attr('data-label');
                         currval = '';
                         currval = $(this).val();
                         currval = currval.replace(/"/g,"'");//to replace double quotes to single quotes
                         currval = currval.replace(/'/g,'sq;');//to replace ingle quotes to sq;

                         //jsonObj[jsonId] = $(this).val().replace(/'/g,'sq;');

                         jsonObj[jsonId] = currval;

                  }
     });

      $('#'+divid+' select').each(function(id){
       if($(this).attr('id') != null)
           {

           jsonId = $(this).attr('data-label');

           if($(this).find('option:selected').text() != '--Select--')
        	   jsonObj[jsonId] = $(this).find('option:selected').text();
           else
        	   jsonObj[jsonId] = '';
      }
      });

 

      $('#'+divid+' input[type=checkbox]').each(function(id){

      if($(this).attr('id') != null)
            {

              jsonId = $(this).attr('data-label');
              jsonObj[jsonId] = $(this).is(':checked');

            }

           });

   $('#'+divid+' input[type=radio]').each(function(id){

       jsonId = $(this).attr('data-label');
       if($(this).is(':checked'))
           jsonObj[jsonId] = $(this).val();

           });
    //console.log(JSON.stringify(jsonObj));

      return jsonObj;

    };
    
    var keyPressAlphabetAllowDotSpace = function(evt)
	{	
			var code = evt.which;
		if(!((evt.which >=65 && evt.which <=90)|| (evt.which>=97 && evt.which <=122) || code==0 || code==8 || code ==32 || code == 46))
			{
				evt.preventDefault();
				return false;
			} 
		return true;
	};
	
	var keyPressAlphabetSpace = function(evt)
	{	
			var code = evt.which;
		if(!((evt.which >=65 && evt.which <=90)|| (evt.which>=97 && evt.which <=122) || code==0 || code==8 || code ==32 ))
			{
				evt.preventDefault();
				return false;
			} 
		return true;
	};
	
    
    
    
    
    var createCheckBoxesWithJSONArrayRole = function(divId,jsonObj,key,val,isdoctor,fnToCall)

    {

           var add = true;

           $('#'+divId).empty();
           var str='';

           $.each(jsonObj,function(idx,ob){

                 

                        str=str+'<div class="col-sm-3">'

             +'<div  class="border-checkbox-section">'

             +'<div class="border-checkbox-group border-checkbox-group-primary">'

                         +'<input class="border-checkbox" type="checkbox" data-isdoctor="'+ob[isdoctor]+'" id="'+ob[key]+'" value="'+ob[val]+'" onclick="'+fnToCall+';">'

                         +'<label class="border-checkbox-label" for="'+ob[key]+'">'+ob[val]+'</label>'

                         +'</div></div></div>';

                       

                        //$('#'+comboId).append('<option value="'+ob[key]+'">'+ob[val]+'</option>');

           });

           $('#'+divId).append(str);

    };
    
    var dataLabelToJSON = function(divid,returnJSON)

    

    {

             

              console.log('Inside dataLabelToJSON');

              var jsonObj;

              var currval;

           if(returnJSON != null)

 

           jsonObj = returnJSON;

 

           else

 

           jsonObj = {};

 

           var jsonId;

 

           $('#'+divid+' input[type=text]').each(function(id){

 

           if($(this).attr('id') != null)

 

                  {

 

                         jsonId = $(this).attr('data-label');

                         currval = '';

                         currval = $(this).val();

                         currval = currval.replace('\n','\\n');//to replace new line \n with \\n

                         currval = currval.replace(/"/g,"'");//to replace double quotes to single quotes

                         currval = currval.replace(/'/g,'sq;');//to replace single quotes to sq;

                         //jsonObj[jsonId] = $(this).val().replace(/'/g,'sq;');

                         jsonObj[jsonId] = currval;

 

                  }

 

           });

 

      $('#'+divid+' input[type=hidden]').each(function(id){

 

           if($(this).attr('id') != null)

 

                  {

 

                         jsonId = $(this).attr('data-label');

 

                         jsonObj[jsonId] = $(this).val();

 

                  }

 

           });

 

      $('#'+divid+' textarea').each(function(id){

 

           if($(this).attr('id') != null)

 

                  {

 

                         jsonId = $(this).attr('data-label');

                         currval = '';

                         currval = $(this).val();

                         currval = currval.replace('\n','\\n');//to replace new line \n with \\n

                         currval = currval.replace(/"/g,"'");//to replace double quotes to single quotes

                         currval = currval.replace(/'/g,'sq;');//to replace ingle quotes to sq;

             

                         //jsonObj[jsonId] = $(this).val().replace(/'/g,'sq;');

                         jsonObj[jsonId] = currval;

 

                  }

 

           });

 

      $('#'+divid+' select').each(function(id){

 

           if($(this).attr('id') != null)

 

                  {

 

           jsonId = $(this).attr('data-label');

 

           if($(this).find('option:selected').text() != '--Select--')

 

                  jsonObj[jsonId] = $(this).find('option:selected').text();

 

           else

 

                  jsonObj[jsonId] = '';

 

                  }

 

           });

 

      $('#'+divid+' input[type=checkbox]').each(function(id){

 

           if($(this).attr('id') != null)

 

                  {

 

                         jsonId = $(this).attr('data-label');

 

                         jsonObj[jsonId] = $(this).is(':checked');

 

                  }

 

           });

 

      $('#'+divid+' input[type=radio]').each(function(id){

 

           jsonId = $(this).attr('data-label');

 

           if($(this).is(':checked'))

 

           jsonObj[jsonId] = $(this).val();

 

           });

 

    //console.log(JSON.stringify(jsonObj));

 

      return jsonObj;

 

    };
    
    var createAjaxParamAESEncrypted = function(aParam,cParam,passphrase) //For TM Encryption

    {

           var pdata = {};

           var iterationCount = 1000;

           var keySize = 128;

           var passphrase = 'Cdactvm_123*';

          

           var plaintext = JSON.stringify(aParam);

           alert ('aParam' + plaintext);

           console.log('aParam:  '+plaintext);

          

           var four = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

           //var four = '577bd45a17977269694908d80905c32a';

           var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

           //var salt = '9a2b73d130c8796309b776eeb09834b0';

           console.log('four:'+four);

           console.log('salt:'+salt);

          

           var aesUtil = aesutil.aesUtil(keySize, iterationCount);

           var ciphertext = aesutil.encrypt(salt, four, passphrase, plaintext);

          

           //alert ('ciphertext'+ciphertext)

          

           console.log('ciphertext:'+ciphertext);

          

           //params['encjson']=ciphertext.toString();

          

           pdata['endata']=ciphertext;

          

           pdata['r']=four;

           pdata['t']=salt;

           pdata['e']='Y';

           alert ('params --'+JSON.stringify(pdata))

          

           return pdata;



}

    var createAjaxParamAESDecrypted = function(ciphertext,four,salt,passphrase) //For TM Decryption

    {

           var iterationCount = 1000;

           var keySize = 128;

           var plaintext = aParam;

           var passphrase = 'Cdactvm_123*';

          

           //var four = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

           //var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

          



          

           console.log('four:'+four);

           console.log('salt:'+salt);

          

           var decryptedtext = aesutil.decrypt(salt, four, passphrase, ciphertext);

           return decryptedtext;

           console.log('decryptedtext:'+decryptedtext);

           //alert ('decryptedtext'+decryptedtext);

    }


	return {
		formToJSON:formToJSON,
		toJSON:toJSON,
		resetFields:resetFields,
		createMasterJSON:createMasterJSON,
		loadData:loadData,
		loadDataById:loadDataById,
		loadComboWithJSONArray:loadComboWithJSONArray,
		createCheckBoxesWithJSONArray:createCheckBoxesWithJSONArray,
		createAjaxParam:createAjaxParam,
		createAjaxParamUnEncrypted:createAjaxParamUnEncrypted,
		getCacheData:getCacheData,
		postData:postData,
		postDataCORS:postDataCORS,
		changeLanguage:changeLanguage,
		changeLanguageInEditPage:changeLanguageInEditPage,
		getPageParameters:getPageParameters,
		validateInput:validateInput,
		keyPressNumeric:keyPressNumeric,
		keyPressDecimal:keyPressDecimal,
		keyPressPrice:keyPressPrice,
		keyPressAlphabet:keyPressAlphabet,
		keyPressAlphabetLower:keyPressAlphabetLower,
		keyPressAlphabetUpper:keyPressAlphabetUpper,
		keyPressAlphaNumeric:keyPressAlphaNumeric,
		keyPressAlphaNumericLower:keyPressAlphaNumericLower,
		keyPressAlphaNumericUpper:keyPressAlphaNumericUpper,
		toPDF:toPDF,
		toExcel:toExcel,
		getPermittedDistricts:getPermittedDistricts,
		getPermittedTaluks:getPermittedTaluks,
		getEditParameters:getEditParameters,
		setEditParameters:setEditParameters,
		openpage:openpage,
		showSession:showSession,
		clearTimer:clearTimer,
		hideBlockedResources:hideBlockedResources,
		showWait:showWait,
		closeWait:closeWait,
		addToLogList:addToLogList,
		showLogList:showLogList,
		process:process,
		postProcess:postProcess,
		setTokenUtils:setTokenUtils,
		getTokenUtils:getTokenUtils,
		getToken:getToken,
		getInitPhrase:getInitPhrase,
		setInitPhrase:setInitPhrase,
		getLStatus:getLStatus,
		setLStatus:setLStatus,
		openPageByAjax :openPageByAjax,
		postImage:postImage,
		showBlankIfNull:showBlankIfNull,
		showBlankIfZero:showBlankIfZero,
		setUrlParameters:setUrlParameters,
		getUrlParameters:getUrlParameters,
		nameToJSON:nameToJSON,
		dataLabelToJSON:dataLabelToJSON,
		loadComboWithJSONArrayForHosp:loadComboWithJSONArrayForHosp,
		//uploadImage:uploadImage,
		//uploadExcel:uploadExcel
		
		createCheckBoxesWithJSONArrayRole:createCheckBoxesWithJSONArrayRole,
		dataLabelToJSON:dataLabelToJSON,
		keyPressAlphabetAllowDotSpace:keyPressAlphabetAllowDotSpace,
		keyPressAlphabetSpace:keyPressAlphabetSpace,
		postDataSummary:postDataSummary,
		loadComboWithJSONArrayForSelectPatient:loadComboWithJSONArrayForSelectPatient,
		createAjaxParamAESEncrypted:createAjaxParamAESEncrypted,
		createAjaxParamAESDecrypted:createAjaxParamAESDecrypted,
	};
});