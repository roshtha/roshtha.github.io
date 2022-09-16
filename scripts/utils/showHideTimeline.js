define('show_minimize_details',function(){



function view_details(arraycount,ListLength)
	{

		for(j=0;j<ListLength;j++){
			
			if(j==arraycount)
				{
				//alert('if'+j)
				//console.log('first time click'+$('#details'+divid).attr('style'));
				if($('#details'+arraycount).attr('style')=='display:visible')
					{
					//console.log('set visible none');
					$('#details'+j).attr('style','display:none');
					}
				else
					{
					//console.log('set visible true');
					$('#details'+j).attr('style','display:visible');
					}
				}
			else
				{
				//alert('else'+j)
				$('#details'+j).attr('style','display:none');
				}

		}
		
		
		
	}
return{
	
	view_details:view_details,
}
});