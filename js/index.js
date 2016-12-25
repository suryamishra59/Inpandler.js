/**
 * @author: Surya Deep Mishra
 */

$(document).ready(
		function() {
			$('html, body').animate({
				scrollTop: 0
			}, 1000);
			
			$('.overlay').click(function() {
				$(this).css('display', 'none');
			});
			
			$(".go-on-top").click(function(e) {
				$('html, body').stop().animate({
					scrollTop : 0,
				}, 1000);
			});
			
			$('a').click(function(){
				$('html, body').animate({
					scrollTop: $( $(this).attr('href') ).offset().top
				}, 1000);
				return false;
			});
			
			$('[data-toggle="tooltip"]').tooltip();
			
			// If browser is Internet Explorer
			if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))){
				alert("Your browsing experience may change with old browsers. It is highly recommend to switch to new browsers.");
			}
			
			// Theme Changer
			$('body').on('change', '.theme .ip-select', function() {
				var theme =$(this).val();
				$('link[title="my-ip-theme"]').attr('href','css/inpandler-themes/inpandler-'+theme+'.css');
			});
		});

		// Preloader
		$(window).load(function() {
			$(".se-pre-con").fadeOut("slow", function(){
				$('html, body').animate({
					scrollTop: 0
				}, 0);
			});
		});
