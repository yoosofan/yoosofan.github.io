
$(document).ready(function ()
{
	$("#algoTrigger").click(function(){
		if($('#radio_set').css('display') != 'none')
		{
			$("#radio_set").toggle("fast");
			$('#settingTrigger').toggleClass("active");
		}
		$("#algo").toggle("fast");
		$(this).toggleClass("active");
	});
	$("#settingTrigger").click(function(){
		if($('#algo').css('display') != 'none')
		{
			$("#algo").toggle("fast");
			$('#algoTrigger').toggleClass("active");
		}
		$("#radio_set").toggle("fast");
		$(this).toggleClass("active");
	});
	$("#helpTrigger").click(function(){
		if($('#radio_set').css('display') != 'none')
		{
			$("#radio_set").toggle("fast");
			$('#settingTrigger').toggleClass("active");
		}
		if($('#algo').css('display') != 'none')
		{
			$("#algo").toggle("fast");
			$('#algoTrigger').toggleClass("active");
		}
	});
});