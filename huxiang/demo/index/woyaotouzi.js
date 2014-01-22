$(function(){
	function setDivAbsoluteOffset(){
		$("#bodydivappend").css("top", $(".head").offset().top+4);   
  		$("#bodydivappend").css("left", $(".head").offset().left+100); 
  		$(".blackten").css("top", $(".head").offset().top);   
  		$(".blackten").css("left", $(".head").offset().left); 
	}

	var _tab=$('ul#tabfirst>li');
	var _con=$('touzilist');
	var _conthis;
	var _index=0;	
	_tab.click(function(){
		_index=_tab.index(this);
		$(this).addClass('tabin1').siblings().removeClass('tabin1');
		_con.filter(':visible').stop(true,true).fadeOut(200,function(){
			_con.fadeIn(200)
		})
	});








	var $manuButton = $('.headright');

	$('#bodydivappend').hide();
	$('.blackten').hide();
	$('.body2').hide();
	setDivAbsoluteOffset;
	$(".blackten").css("top", $(".head").offset().top); 

	
	$(window).resize(function()
	{
	 	setDivAbsoluteOffset;
	});


	$manuButton.on('click',function()
	{
		$('#bodydivappend').fadeToggle(1000);
		$('.blackten').fadeToggle(1000);

	});

});