$(document).ready(function(){

//sliders
	autoChangeSlide();
	var $nrSlide=0;
	$(".icon-dot").on('click', function(){ 
		$nrSlide = $(this).attr('data-nrSlide'); changeSlide();
	});
function autoChangeSlide(){
	$(".icon-dot[data-nrSlide = "+$nrSlide+"]").css({"color": "#6e7476"});
	if ($nrSlide>2){
		$nrSlide=0;
	}	
	$(".home__container").animate({right: $nrSlide + "00%"},800,"swing");
	$(".team__slider").animate({right: $nrSlide + "00%"},800,"swing");
	$(".icon-dot").css({"color": "#6e7476"});
	$(".icon-dot[data-nrSlide = "+$nrSlide+"]").css({"color": "#000000"});
	$nrSlide++;
		setTimeout(function(){autoChangeSlide();}, 4000);
	return;
}
function changeSlide(){
	$(".home__container").animate({right: $nrSlide + "00%"},800,"swing");
	$(".team__slider").animate({right: $nrSlide + "00%"},800,"swing");
	$(".icon-dot").css({"color": "#6e7476"});
	$(".icon-dot[data-nrSlide = "+$nrSlide+"]").css({"color": "#000000"});
}

//Fixed navigation
	$(window).on('scroll resize', function(){
		var scroll = $(window).scrollTop() + 60;
		var height = $('.features').offset().top;
		if (scroll>=height){
			$('.site-header').addClass('site-header--fixed');
		}
		else{
			$('.site-header').removeClass('site-header--fixed');
		}
	});

//Animation scroll and navigation scroll
	var slide=[];
	var scroll="";
	$(window).on('scroll resize', function(){
		$.each($('.home, .features, .works, .team, .fun-facts, .contact, .site-footer'), function(i,element){
			slide[i]=$(element).offset().top;
		});
	});
	var nrSection=0;
	$(".navigation__list__item").on('click', function(){
		$nrSection = $(this).index();
		if ($nrSection>3){
			scroll = slide[$nrSection + 1];
		}
		else {
			scroll = slide[$nrSection];
		}
		$("html, body").stop().animate( { scrollTop: scroll }, 1000);

	});

	//animation scroll
	var $animation_elements = $('.animation-element');
	$(window).on('scroll resize', function(){
		var window_height = $(window).height();
  		var window_top_position = $(window).scrollTop();
  		var window_bottom_position = (window_top_position + window_height);
  		$.each($animation_elements, function(){
  			var $element = $(this);
    		var element_height = $element.outerHeight();
    		var element_top_position = $element.offset().top;
    		var element_bottom_position = (element_top_position + element_height);
    		 if ((element_bottom_position >= window_top_position) &&
       			(element_top_position <= window_bottom_position)) {
    		 	$(this).find('*').css({"animation-play-state":"running"});}
  		});
	});

	//Menu open
	$('.navigation__hamburger').on('click', function(){
		$('.navigation__list').slideToggle();
	});
	var width = $(window).width();
	$(window).resize(function(){
	 	width = $(window).width();
	})
	$(window).scroll(function(){
		if (width<750){
			$('.navigation__list:visible').slideUp();
		}
	});
	$(window).resize(function(){
		if (width<750){
			$('.navigation__list:visible').slideUp();
		}
		else if (width>=750){
		$('.navigation__list:hidden').slideDown();
		$('.navigation__list').css({"display":"inline-block"});
	}
	});

	//Portfolio mix
	var $nrButton
	$('.works__list__titles').on('click', function(){
		 $nrButton = $(this).index();
		 if ($nrButton==0){
		 	$('.works__items__pic').fadeIn(300);
		 	$(".works__list__titles").removeClass("active");
		 	$(this).addClass("active");
		 }
		 else {
		 $('.works__items__pic').fadeOut(300);
		 $('.works__items__pic[data-animated-pic='+$nrButton+']').delay(300).fadeIn(300);
		 $(".works__list__titles").removeClass("active");
		 $(this).addClass("active");
		}
	});

	//team hover
	$('.team__slider__list__item__pic').mouseenter(function(){
		$(this).siblings('.team__slider__list__item__title').addClass('hover');
	});
	$('.team__slider__list__item__pic').mouseleave(function(){
		$(this).siblings('.team__slider__list__item__title').removeClass('hover');
	});

	//map
		var latitude = 32.5255069,
		longitude = 25.0836207,
		map_zoom = 14;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'images/cd-icon-location.png' : 'images/cd-icon-location.svg';
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-map'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

});