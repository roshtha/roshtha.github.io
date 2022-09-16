/**
 * New node file
 */
define('tokenutils',function(){
	
	var token,initPhrase,lstatus;
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

	var getToken = function()
	{
	 return token;	
	};
	
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
	
	return {
		process:process,
		getToken:getToken,
		getInitPhrase:getInitPhrase,
		setInitPhrase:setInitPhrase,
		getLStatus:getLStatus,
		setLStatus:setLStatus
	}
});