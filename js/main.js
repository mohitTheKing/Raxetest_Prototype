jQuery(function($) {'use strict',

	//#main-slider
	$(function(){

		populateQuotes();

		$('#main-slider > .carousel').carousel({
			interval: 8000
		});

		var quotesCarousel = $('#quotes-slider > .carousel');

		$(quotesCarousel).carousel({
			interval: 2000
		});
	});

	


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	function getQuotesJson(){
		return [{
						"quote": "You must be the change you wish to see in the world",
						"author": "Gandhi"
					}, {
						"quote": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut et dolore magna aliqua. Ut enim ad minim veniam",
						"author": "Anonymous"
					}, {
						"quote": "Faith is the bird that feels the light when the dawn is still dark",
						"author": "Rabindranath Tagore"
					}, {
						"quote": "Education is the most powerful weapon which you can use to change the world",
						"author": "Nelson Mandela"
					}];
	}

	function populateQuotes(){
		var quotes = getQuotesJson();

		//load the handlebar template
		var innerTemplateScript = $("#quotes-template").html();
		var innerTemplate = Handlebars.compile(innerTemplateScript);

		var indicatorTmpltScript = $("#quotes-indicator-template").html();
		var indicatorTemplate = Handlebars.compile(indicatorTmpltScript);


		var quotesFinalHtml = "";
		var indicatorFinalHtml = "";

		$.each(quotes, function(i, value) {

            value.active = (i == 0 ? 'active' : '');

			// Pass our data to the template
  			var innerCompiledHtml = innerTemplate(value);
  			quotesFinalHtml += innerCompiledHtml;

  			var indicatorCompiledHtml = indicatorTemplate({'i': i, 'active': value.active});
  			indicatorFinalHtml += indicatorCompiledHtml;

        });

		var quotesHtmlContainer = $('#quotes-carousel-inner');
		$(quotesHtmlContainer).html(quotesFinalHtml);

		var indicatorHtmlContainer = $('#quotes-carousel-indicators');
		$(indicatorHtmlContainer).html(indicatorFinalHtml);
	}
});




