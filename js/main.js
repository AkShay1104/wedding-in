'use strict';

//**ANGULAR**//
angular.module('ourWedding', ['uiGmapgoogle-maps', 'matchMedia'])
	.config(function() {
		window.onload = function() {
			var element = document.getElementById("loading");
			setTimeout(function() {
				element.style.display = "none";
			}, 3000);
		};

		$('.menu').onePageNav({
			changeHash: false,
			scrollSpeed: 1200,
	 	});

		$.material.init();
		$('[data-toggle="tooltip"]').tooltip();
		new WOW().init();
		$.scrollUp({
      scrollName: 'scrollUp',      // Element ID
      scrollDistance: 300,         // Distance from top/bottom before showing element (px)
      scrollFrom: 'top',           // 'top' or 'bottom'
      scrollSpeed: 300,            // Speed back to top (ms)
      easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
      animation: 'fade',           // Fade, slide, none
      animationSpeed: 200,         // Animation speed (ms)
      scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
      scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
      scrollText: '', // Text for element, can contain HTML
      scrollTitle: false,          // Set a custom <a> title if required.
      scrollImg: false,            // Set true to use image
      activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
      zIndex: 2147483647           // Z-Index for the overlay
    });

		window.addEventListener('scroll', function (e) {
			var nav = document.getElementById('nav');
			if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
					nav.classList.add('nav-colored');
					nav.classList.remove('nav-transparent');
				} else {
					nav.classList.add('nav-transparent');
					nav.classList.remove('nav-colored');
				}
		})
	})
	.directive('ngSglclick', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
              var fn = $parse(attr['ngSglclick']);
              var delay = 300, clicks = 0, timer = null;
              element.on('click', function (event) {
                clicks++;  //count clicks
                if(clicks === 1) {
                  timer = setTimeout(function() {
                    scope.$apply(function () {
                        fn(scope, { $event: event });
                    });
                    clicks = 0;             //after action performed, reset counter
                  }, delay);
                  } else {
                    clearTimeout(timer);    //prevent single-click action
                    clicks = 0;             //after action performed, reset counter
                  }
              });
            }
        };
    }])
    .directive('iosDblclick',
        function () {
            var DblClickInterval = 300; //milliseconds

            var firstClickTime;
            var waitingSecondClick = false;

            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('click', function (e) {

                        if (!waitingSecondClick) {
                            firstClickTime = (new Date()).getTime();
                            waitingSecondClick = true;

                            setTimeout(function () {
                                waitingSecondClick = false;
                            }, DblClickInterval);
                        }
                        else {
                            waitingSecondClick = false;

                            var time = (new Date()).getTime();
                            if (time - firstClickTime < DblClickInterval) {
                                scope.$apply(attrs.iosDblclick);
                            }
                        }
                    });
                }
            };
    	}
    )
	.controller('WeddingCtrl', ['$scope', '$location', '$anchorScroll', 'screenSize', '$window',
		function($scope, $location, $anchorScroll, screenSize, $window) {

			//**PRIVATE**//
			var urlTw = {
				pipit: 'https://twitter.com/fitripipitana',
				ikhsan: 'https://twitter.com/abdfattahikhsan'
			};

			var urlFb = {
				pipit: 'https://www.facebook.com/fitri.ana.716',
				ikhsan: 'https://www.facebook.com/ikhsan.alatsary'
			};

			var urlGplus = {
				pipit: 'https://plus.google.com/113383305409625413541',
				ikhsan: 'https://plus.google.com/+abdulfattahikhsanalatsary'
			};

			var urlInsta = {
				pipit: 'https://www.instagram.com/pipitana/',
				ikhsan: 'https://www.instagram.com/ikhsan_alatsary/'
			};

			var wedLoc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.263992472555!2d77.60789177243291!3d12.890738996096246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14d8425ec08f%3A0x70b08f40c5e4feb!2s865%2C%20Vijaya%20Bank%20Layout%2C%20Bilekahalli%2C%20Bengaluru%2C%20Karnataka%20560076!5e0!3m2!1sen!2sin!4v1578329214102!5m2!1sen!2sin"

			function twPipit() {
				openUrl(urlTw.pipit);
			}

			function twIkhsan() {
				openUrl(urlTw.ikhsan);
			}

			function fbPipit() {
				openUrl(urlFb.pipit);
			}

			function fbIkhsan() {
				openUrl(urlFb.ikhsan);
			}

			function gplusIkhsan() {
				openUrl(urlGplus.ikhsan);
			}

			function gplusPipit() {
				openUrl(urlGplus.pipit);
			}

			function instaIkhsan() {
				openUrl(urlInsta.ikhsan);
			}

			function instaPipit() {
				openUrl(urlInsta.pipit);
			}

			function openUrl(url) {
				var openUrl = $window.open(url, '_blank');
				openUrl.focus();
			}

			function isMobile() {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					return false;
				}
				return true;
			}
			function scrollTo(id) {
				$location.hash(id);
				$anchorScroll();
			}

			function isActive(id) {
				return $location.hash() === id;
			}

			//**[PUBLIC] Export To view**//

			$scope.map = {
				center: {
				 latitude: 12.890736,
				 longitude: 77.609346
				},
				zoom: 16
			};

			$scope.options = {
				scrollwheel: false,
				draggable: isMobile()
			};

			$scope.marker = {
				id: 0,
				coords: {
				  latitude: 12.890736,
				  longitude: 77.609346
				}
			};

			$scope.controlText = 'Open in Gmaps';

			$scope.controlClick = function() {
				openUrl(wedLoc);
			};

			$scope.quotes = [
				{"id":1, "quote":"For you see, each day I love you more. Today more than yesterday and less than tomorrow."},
				{"id":2, "quote":"A happy marriage is a long conversation which always seems too short."},
				{"id":3, "quote":"I knew I loved you from the moment we met, and I have been helplessly lost in your eyes ever since."},
				{"id":4, "quote":"A successful marriage requires falling in love many times, always with the same person."},
				{"id":5, "quote":"I love you, not only for what you are, but for what I am when I am with you. I love you, not only for what you have made of yourself, but for what you are making of me."},
				{"id":6, "quote":"Grow old along with me; the best is yet to be."}
			];

			$scope.scrollTo = scrollTo;
			$scope.isActive = isActive;
			$scope.desktop = screenSize.on('md, lg', function(match){
			    $scope.desktop = match;
			});
			$scope.mobile = screenSize.on('xs, sm', function(match){
			    $scope.mobile = match;
			});
			$scope.twIkhsan = twIkhsan;
			$scope.twPipit = twPipit;
			$scope.fbIkhsan = fbIkhsan;
			$scope.fbPipit = fbPipit;
			$scope.gplusPipit = gplusPipit;
			$scope.gplusIkhsan = gplusIkhsan;
			$scope.instaPipit = instaPipit;
			$scope.instaIkhsan = instaIkhsan;
		}
	]);
