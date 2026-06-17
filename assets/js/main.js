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
			
// ==========================================================================
	// 1. XỬ LÝ HIỆU ỨNG CHUYỂN TRANG MƯỢT MÀ (TỐI ƯU TƯƠNG THÍCH GITHUB PAGES)
	// ==========================================================================
	$(function() {
		// Bắt tất cả các liên kết chuyển đổi giữa các file HTML độc lập trên menu
		$('#header .links a, #menu .links a, #header h1 a').on('click', function(event) {
			var href = $(this).attr('href');
			
			// Kiểm tra điều kiện an toàn: Link tồn tại, không phải anchor nhảy mục (#) và không mở tab mới
			if (href && href.indexOf('#') === -1 && href !== 'javascript:void(0);' && $(this).attr('target') !== '_blank') {
				
				// Lấy thông tin tên miền để xác định link nội bộ
				var currentTarget = this.hostname;
				
				// Chỉ chạy hiệu ứng nếu nhảy tab trong cùng một trang web hiện tại (Internal Link)
				if (currentTarget === window.location.hostname) {
					event.preventDefault();
					
					// Gỡ bỏ class hiện hình và kích hoạt class mờ dần (Fade-out) của #wrapper
					$('body').removeClass('page-fade-in');
					$('body').addClass('page-fade-out');
					
					// Đợi 400ms cho phần nội dung cũ mờ hẳn rồi mới chính thức chuyển trang mới
					setTimeout(function() {
						window.location.href = href;
					}, 400);
				}
			}
		});
	});

	// ==========================================================================
	// 2. XỬ LÝ SCROLLSPY TỰ ĐỘNG TÔ ĐẬM MỤC LỤC TRANG PROJECTS (MƯỢT MÀ BẰNG GPU)
	// ==========================================================================
	$(function() {
		var $tocLinks = $('#project-toc header a');
		if ($tocLinks.length && 'IntersectionObserver' in window) {
			
			var options = {
				root: null,
				rootMargin: '-30% 0px -50% 0px', /* Vùng thấu kính nhận diện tối ưu giữa màn hình */
				threshold: 0
			};

			var activeId = "";

			var observer = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var id = entry.target.getAttribute('id');
						if (id !== activeId) {
							activeId = id;
							
							// Tối ưu hóa: Đưa tác vụ thay đổi giao diện vào luồng đồ họa phần cứng requestAnimationFrame
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