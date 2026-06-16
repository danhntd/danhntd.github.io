/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});
			
$(function() {
		var $tocLinks = $('#project-toc header a');
		if ($tocLinks.length && 'IntersectionObserver' in window) {
			
			var options = {
				root: null,
				rootMargin: '-30% 0px -50% 0px', 
				threshold: 0
			};

			var activeId = "";

			var observer = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var id = entry.target.getAttribute('id');
						if (id !== activeId) {
							activeId = id;
							
							// Đồng bộ mượt mà với luồng làm tươi (render) của GPU
							window.requestAnimationFrame(function() {
								$tocLinks.removeClass('active');
								$('#project-toc header a[href="#' + id + '"]').addClass('active');
							});
						}
					}
				});
			}, options);

			// Theo dõi vị trí của từng bài viết dự án tương ứng trên trang
			$tocLinks.each(function() {
				var targetId = $(this).attr('href');
				if (targetId && targetId.indexOf('#') === 0) {
					var $targetSection = $(targetId);
					if ($targetSection.length) {
						observer.observe($targetSection[0]);
					}
				}
			});
		}
	});
	
})(jQuery);