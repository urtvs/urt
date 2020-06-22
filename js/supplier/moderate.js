$(document).ready(function()
{
	var imgID=0;

	
	$(".moder").click(function()
	{
		var req={};
		req.do='moderateImg';
		
		if(imgID>0)
		{
			req.imgID=imgID;
			req.moderateStatus=$(this).attr('value');			
		}
		
		console.log(req);
		
		console.log('imgID='+imgID);
		$.getJSON('https://a.unirenter.ru/b24/api/supplier.php', req, function (data) 
		{
			console.log(data.imgModerate[0].fileUrl);
			imgID=data.imgModerate[0].id;
			$("#img").html('<img src="'+data.imgModerate[0].fileUrl+'">');
		});
		
		console.log('moderate status='+$(this).attr('value'));
	});
	
});
