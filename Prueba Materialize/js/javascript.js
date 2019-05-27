	const sideNav = $('#mobile-nav');
	M.Sidenav.init(sideNav, {});
	const photosIds = {
		"Bora Bora": '40853555803',
		"San Petersburgo": '47820067441',
		"Rize, Turquía": '32876183907',
		"Raja Ampat Islands, Indonesia": '47820067801',
		"París": '47767812582',
		"Res Sqare, Moscú": '46903694935',
		"Maldivas": '47820068621',
		"Machu Pichu": '46903695255',
		"Londres": '32876187627',
		"Kuala Lumpur, Malaysia": '46903697145',
		"Kiev, Ucrania": '47030458254',
		"Pragser Wildsee, Italia": '47030458654',
		"Castillo Dunluce, Irlanda": '47030458794',
		"Heaven Linking Avenue, China": '46903699755',
		"Cataratas del Iguazú, Argentina": '47767819912'
	}
	const targets = {
		"Bora Bora": 'BOB-sky',
		"San Petersburgo": 'LED-sky',
		"Rize, Turquía": 'TR-sky',
		"Raja Ampat Islands, Indonesia": 'ID-sky',
		"París": 'PARI-sky',
		"Res Sqare, Moscú": 'MOSC-sky',
		"Maldivas": 'MV-sky',
		"Machu Pichu": 'MFT-sky',
		"Londres": 'LOND-sky',
		"Kuala Lumpur, Malaysia": 'MY-sky',
		"Kiev, Ucrania": 'UA-sky',
		"Pragser Wildsee, Italia": 'IT-sky',
		"Castillo Dunluce, Irlanda": 'IE-sky',
		"Heaven Linking Avenue, China": 'CN-sky',
		"Cataratas del Iguazú, Argentina": 'IGR-sky'
	}
	var carousel = $('.carousel.carousel-slider');
	var price;

	$(document).ready(function(){

		if($('#main-nav').length > 0) {
			price = getPrice('PARI-sky', today(), 'paris');
			price = getPrice('LOND-sky', today(), 'londres');
			price = getPrice('CN-sky', today(), 'china');
			price = getPrice('MLE-sky', today(), 'maldivas');
		};

		if($('#ria-nav').length > 0) {
			var response = window.location.search.substring(1);
			var pos = response.indexOf('=');
			if (pos > 0)
			{
				var place = response.substring(pos + 1);
				var url = searchPhoto(place);
				console.log(url);
				//$('.parallax img').attr('src', url.photo[0].url_k);
			}
		};

		carousel.carousel({
			fullWidth: true,
			indicators: true,
			onCycleTo : function($current_item, dragged) {
				//console.log($current_item);
				stopAutoplay();
				startAutoplay(carousel);
			}
		});


		$('input.autocomplete').autocomplete({
			data: {
				"Bora Bora": 'https://live.staticflickr.com/65535/40853555803_4a91c6c7a1_s.jpg',
				"San Petersburgo": 'https://live.staticflickr.com/65535/47820067441_ec17eda7fe_s.jpg',
				"Rize, Turquía": 'https://live.staticflickr.com/65535/32876183907_ddb06039bf_s.jpg',
				"Raja Ampat Islands, Indonesia": 'https://live.staticflickr.com/65535/47820067801_7e8b46ea67_s.jpg',
				"París": 'https://live.staticflickr.com/65535/47767812582_f08d2d3b50_s.jpg',
				"Res Sqare, Moscú": 'https://live.staticflickr.com/65535/46903694935_c89bfcf396_s.jpg',
				"Maldivas": 'https://live.staticflickr.com/65535/47820068621_6dd22eef09_s.jpg',
				"Machu Pichu": 'https://live.staticflickr.com/65535/46903695255_2b8b0a7d02_s.jpg',
				"Londres": 'https://live.staticflickr.com/65535/32876187627_2a213cc704_s.jpg"',
				"Kuala Lumpur, Malaysia": 'https://live.staticflickr.com/65535/46903697145_e09d724057_s.jpg',
				"Kiev, Ucrania": 'https://live.staticflickr.com/65535/47030458254_fb019eb2d7_s.jpg',
				"Pragser Wildsee, Italia": 'https://live.staticflickr.com/65535/47030458654_9e211567e2_s.jpg',
				"Castillo Dunluce, Irlanda": 'https://live.staticflickr.com/65535/47030458794_2ca50c5a41_s.jpg',
				"Heaven Linking Avenue, China": 'https://live.staticflickr.com/65535/46903699755_73f931fa7e_s.jpg',
				"Cataratas del Iguazú, Argentina": 'https://live.staticflickr.com/65535/47767819912_003bdee234_s.jpg'
			},
			onAutocomplete: function(val) {
				console.log(val);
				window.location = 'ria.html?place=' + val;
			},
		});

		$('.parallax').parallax();

		


		$('#txtDestino').keypress(function(event){

			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				alert(searchTarget($(this).val()));
			}
			event.stopPropagation();
		});

	});

	// Autoplay para el carousel
	function autoplay() {
		$('.carousel').carousel('next');
		setTimeout(autoplay, 4500);
	}
	var autoplay_id;
	function startAutoplay($carousel) {
		autoplay_id = setInterval(function() {
			$carousel.carousel('next');
		}, 5000); // every 5 seconds
	  //console.log("starting autoplay");
	}

	function stopAutoplay() {
		if(autoplay_id) {
			clearInterval(autoplay_id);
		//console.log("stoping autoplay");
	}
}
function searchTarget(target) {
	$.ajax({
		type: 'GET',
		url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UY/USD/es-ES/?query=' + target,
		dataType: 'JSON',
		contentType: 'application/json',
		headers: { 'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com', 'X-RapidAPI-Key' : '1d83611c87msh340e9b8f2680da3p114342jsnd7f8854065fc' },
		success: function(response) {
			console.log(JSON.stringify(response, null, '\t'));
			return response;
		},
		error: function(xhr,status,error) {
			alert("Error:" + JSON.stringify(xhr, null, '\t'));
		}
	});
}
function getPrice(destination, outboundpartialdate, item) {
	$.ajax({
		type: 'GET',
		url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/es-ES/US-sky' + '/' + destination + '/' + outboundpartialdate,
		dataType: 'JSON',
		contentType: 'application/json',
		headers: { 'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com', 'X-RapidAPI-Key' : '1d83611c87msh340e9b8f2680da3p114342jsnd7f8854065fc' },
		success: function(response) {
			var price = response.Quotes[0].MinPrice;
				//console.log(JSON.stringify(response, null, '\t'));
				
				try {
					console.log('Precio de ' + destination + ' - ' + item + ' span - ' + price);
					$('#' + item + ' span').append("<b>" + price + "</b>");
					//$('#' + item + ' span').css('color', 'blue');
				} catch (err){
					console.log(err);
				}
				return price;
			},
			error: function(xhr,status,error) {
				alert("Error:" + JSON.stringify(xhr, null, '\t'));
			}
		});
}

var qsParm = new Array();
function qs() {
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i < parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0, pos);
			var val = parms[i].substring(pos + 1);
			qsParm[key] = val;
			if (key = 'destino') {

			}
		}
	}
}
	// function getMinPrice(pricesList) {
	// 	var minPrice = 999999;
	// 	console.log(pricesList);
	// 	for(var p in pricesList) {
	// 		if (p < minPrice) {
	// 			minPrice = p;
	// 		}
	// 	}
	// 	return minPrice;
	// }

	function searchPhoto(keyword) {
		var photos;
		$.ajax({
			method: 'GET',
			"async": true,
			"crossDomain": true,
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ce9177f45b2766eadfe2931abd09a4b8&tags=' + keyword + ',landscape&extras=url_k&sort=relevance&format=json&nojsoncallback=1',
			dataType: 'JSON',
			headers: {},
			success: function(response) {
				console.log(response.photos.photo[1].url_k);
				$('#main-image').attr('src', response.photos.photo[1].url_k);
				$('#destino').append('<b>' + decodeURI(keyword.replace(/%20/g, ' ')) + '</b>');
			}
		});
		console.log(photos);
		return photos;
	}

	function today(){
		var today = new Date();
		var dd = String(today.getDate()+1).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		//console.log(today);
		return today
	}
	// $.ajax({
	// 	type: 'GET',
	// 	url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UY/USD/es-ES/?query=monte',
	// 	dataType: 'JSON',
	// 	contentType: 'application/json',
	// 	headers: { 'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com', 'X-RapidAPI-Key' : '1d83611c87msh340e9b8f2680da3p114342jsnd7f8854065fc' },
	// 	success: function(response) {
	// 		alert(JSON.stringify(response, null, '\t'));
	// 		return response;
	// 	},
	// 	error: function(xhr,status,error) {
	// 		alert("Error:" + JSON.stringify(xhr));
	// 	}
	// });