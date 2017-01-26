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

		loadResultCharts();
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

function loadResultCharts(){

	loadBarChart();
	loadPieChart();
	
}

function loadBarChart(){
	var ctx = document.getElementById("myBarChart").getContext("2d");

	var chartData = getBarChartData();

	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: chartData.labels,
	        datasets: [{
	            label: 'Time taken to answer (in seconds)',
	            data: chartData.data,
	            backgroundColor: chartData.backgroundColor,
	            borderColor: chartData.borderColor,
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
}

function loadPieChart(){
	var ctx = document.getElementById("myPieChart").getContext("2d");

	var chartData = getPieChartData();

	var myPieChart = new Chart(ctx,{
	    type: 'pie',
	    data: chartData
	});
}

function getPieChartData(){
	return {
	    labels: [
	        "<50%",
	        "50-65%",
	        "66-75%",
	        "76-90%",
	        ">90%",
	    ],
	    datasets: [
	        {
	            data: [40, 180, 200, 100, 10],
	            backgroundColor: [
		            "#FFCE56",
		            "#FF6384",
		            
		            "#36A2EB",
		            "#4BC0C0",
		            "#E7E9ED"
	            ],
	            hoverBackgroundColor: [
		            "#FFCE56",
		            "#FF6384",
		            "#36A2EB",
		            "#4BC0C0",
		            "#E7E9ED",
	            ]
	        }]
	};

}

function getBarChartData(){
	var labels =  ["0-15", "16-30", "31-45", "46-60", "More than 60"]
	var data = [10, 50, 200, 150, 100];

	var backgroundColor = [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ];
	var borderColor = [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ];

	return {
		'labels' : labels,
		'data' : data,
		'backgroundColor': backgroundColor,
		'borderColor': borderColor
	}
}


