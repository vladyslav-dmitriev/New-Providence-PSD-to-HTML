/* WOW.js */
new WOW().init();

/* magnific-popup */
$('.popup-youtube').magnificPopup({ 
    type: 'iframe',
    iframe: {
    	patterns: {
    		yotube: {
    			index: 'youtube.com/',
    			id: 'v=',
    			src: '//www.youtube.com/embed/7HKoqNJtMTQ?autoplay=1'
    		}
    	}
    }
});

/* scroll button */
$('.scrollTop').on('click', function(e) {
	e.preventDefault();
	$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});

$(window).on('scroll', function() {
	if($(this).scrollTop() > $(window).height()) {
		$('.scrollTop').addClass('visible');
	} else {
		$('.scrollTop').removeClass('visible');
	}
});

/* resize top-line */
$(window).on('scroll', function() {
	if($(this).scrollTop() > 70) {
		$('.top-line').addClass('top-line_active');
		$('.burger').addClass('burger_active');
	} else {
		$('.top-line').removeClass('top-line_active');
		$('.burger').removeClass('burger_active');
	}
});

/* slider */
$('.slider__link_company').on('click', function(e) {

	function rateCompanyVisible() {
		$('.rate__company').addClass('rate_visible');
		$('.rate__company').css('transform', 'scale(1)');
	};

	e.preventDefault();
	$('.slider__btn').addClass('slider__btn_second');
	$('.rate__individual').removeClass('rate_visible');
	setTimeout(rateCompanyVisible, 200);
});

$('.slider__link_individual').on('click', function(e) {

	function rateIndividualVisible() {
		$('.rate__individual').addClass('rate_visible');
	};

	e.preventDefault();
	$('.slider__btn').removeClass('slider__btn_second');
	$('.rate__company').removeClass('rate_visible');
	setTimeout(rateIndividualVisible, 200);
});

/* left-menu open & close */
$('.menu__open').on('click', function(e) {
	e.preventDefault();
	$('.left-menu').addClass('left-menu_visible');
});

$('.left-menu__close').on('click', function(e) {
	e.preventDefault();
	$('.left-menu').removeClass('left-menu_visible');
});