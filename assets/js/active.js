(function($) {

    "use strict";


 

    $('select').niceSelect();


    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
    }

    $('.donate_form_amount_wrap li').on('click', function() {
        $('.donate_form_amount_wrap li').removeClass('active');
        $(this).addClass('active');
    })


    //Hidden Sidebar
    if ($('.header-widget-sidebar').length) {

        var animButton = $(".sidemenu-nav-toggler"),
            hiddenBar = $(".header-widget-sidebar"),
            navOverlay = $(".nav-overlay"),
            hiddenBarClose = $(".header-widget-sidebar-close");

        function showMenu() {
            TweenMax.to(hiddenBar, 0.6, {
                force3D: false,
                right: "0",
                ease: Expo.easeInOut
            });
            hiddenBar.removeClass("close-sidebar");
            navOverlay.fadeIn(500);
        }

        function hideMenu() {
            TweenMax.to(hiddenBar, 0.6, {
                force3D: false,
                right: "-410px",
                ease: Expo.easeInOut
            });
            hiddenBar.addClass("close-sidebar");
            navOverlay.fadeOut(500);
        }
        animButton.on("click", function() {
            if (hiddenBar.hasClass("close-sidebar")) showMenu();
            else hideMenu();
        });
        navOverlay.on("click", function() {
            hideMenu();
        });
        hiddenBarClose.on("click", function() {
            hideMenu();
        });
    }

    if ($('.nav-overlay').length) {
        // / cursor /
        var cursor = $(".nav-overlay .cursor"),
            follower = $(".nav-overlay .cursor-follower");

        var posX = 0,
            posY = 0;

        var mouseX = 0,
            mouseY = 0;

        TweenMax.to({}, 0.016, {
            repeat: -1,
            onRepeat: function() {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;

                TweenMax.set(follower, {
                    css: {
                        left: posX - 22,
                        top: posY - 22
                    }
                });

                TweenMax.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });

            }
        });

        $(document).on("mousemove", function(e) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            mouseX = e.pageX;
            mouseY = e.pageY - scrollTop;
        });
        $("button, a").on("mouseenter", function() {
            cursor.addClass("active");
            follower.addClass("active");
        });
        $("button, a").on("mouseleave", function() {
            cursor.removeClass("active");
            follower.removeClass("active");
        });
        $(".nav-overlay").on("mouseenter", function() {
            cursor.addClass("close-cursor");
            follower.addClass("close-cursor");
        });
        $(".nav-overlay").on("mouseleave", function() {
            cursor.removeClass("close-cursor");
            follower.removeClass("close-cursor");
        });
    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn,.scroll-nav li a').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });
    }

    //Sidemenu Nav Hide Show
    if ($('.side-menu').length) {

        //Dropdown Button
        $('.side-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });

        $('body').addClass('side-menu-visible');
        //Menu Toggle Btn
        $('.side-nav-toggler').on('click', function() {
            $('body').addClass('side-menu-visible');
        });

        //Menu Toggle Btn
        $('.side-menu .side-menu-resize').on('click', function() {
            $('body').toggleClass('side-menu-visible');
        });

        //Menu Toggle Btn
        $('.main-header .mobile-nav-toggler-two').on('click', function() {
            $('body').addClass('side-menu-visible-s2');
        });

        //Menu Overlay
        $('.main-header .side-menu-overlay').on('click', function() {
            $('body').removeClass('side-menu-visible-s2');
        });
    }



    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function() {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function() {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        // if no file name return 
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }




    // dynamic current class        
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);




    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');
            var sticky_header = $('.main-header .sticky-header');
            if (windowpos > 100) {
                siteHeader.addClass('fixed-header');
                sticky_header.addClass("animated slideInDown");
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                sticky_header.removeClass("animated slideInDown");
                scrollLink.fadeOut(300);
            }
        }
    }

    headerStyle();



    //Search Popup
    if ($('#header-main-search').length) {

        //Show Popup
        $('.search-toggler').on('click', function() {
            $('#header-main-search').addClass('popup-visible');
        });
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                $('#header-main-search').removeClass('popup-visible');
            }
        });
        //Hide Popup
        $('.close-search,.header-main-search .overlay-layer').on('click', function() {
            $('#header-main-search').removeClass('popup-visible');
        });
    }

    function bannerSlider() {
        if ($(".banner-slider").length > 0) {

            // Banner Slider
            var bannerSlider = new Swiper('.banner-slider', {
                preloadImages: false,
                loop: true,
                grabCursor: true,
                centeredSlides: false,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 1400,
                spaceBetween: 0,
                parallax: false,
                effect: "slide",
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.banner-slider-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.banner-slider-button-next',
                    prevEl: '.banner-slider-button-prev',
                },
            });
        }
    }


    // Donation Progress Bar
    if ($('.count-bar').length) {
        $('.count-bar').appear(function() {
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width', percent).addClass('counted');
        }, {
            accY: -50
        });

    }

    //Jquery Spinner / Quantity Spinner
    if ($('.quantity-spinner').length) {
        $("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        });
    }

    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }


    //Accordion Box
    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).hasClass('active') !== true) {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
            }

            if ($(this).next('.acc-content').is(':visible')) {
                return false;
            } else {
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }

    //LightBox / Fancybox
    if ($('.lightbox-image').length) {
        $('.lightbox-image').fancybox({
            openEffect: 'fade',
            closeEffect: 'fade',
            helpers: {
                media: {}
            }
        });
    }

    //Sortable Masonary with Filters
    function sortableMasonry() {
        if ($('.sortable-masonry').length) {
            var winDow = $(window);
            // Needed variables
            var $container = $('.sortable-masonry .items-container');
            var $filter = $('.filter-btns');
            $container.isotope({
                filter: '.all',
                animationOptions: {
                    duration: 500,
                    easing: 'linear'
                }
            });
            // Isotope Filter 
            $filter.find('li').on('click', function() {
                var selector = $(this).attr('data-filter');
                try {
                    $container.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 500,
                            easing: 'linear',
                            queue: false
                        }
                    });
                } catch (err) {}
                return false;
            });
            winDow.on('resize', function() {
                var selector = $filter.find('li.active').attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false
                    }
                });
                $container.isotope()
            });
            var filterItemA = $('.filter-btns li');
            filterItemA.on('click', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    filterItemA.removeClass('active');
                    $this.addClass('active');
                }
            });
            $container.isotope("on", "layoutComplete", function(a, b) {
                var a = b.length,
                    pcn = $(".filters .count");
                pcn.html(a);
            });
        }
    }
    sortableMasonry();



    //Round progress
    if ($('.dial').length) {
        $('.dial').appear(function() {
            var elm = $(this);
            var color = elm.attr('data-fgColor');
            var perc = elm.attr('value');
            elm.knob({
                'value': 0,
                'min': 0,
                'max': 100,
                'skin': 'tron',
                'readOnly': true,
                'thickness': 0.15,
                'dynamicDraw': true,
                'displayInput': false
            });
            $({
                value: 0
            }).animate({
                value: perc
            }, {
                duration: 2000,
                easing: 'swing',
                progress: function() {
                    elm.val(Math.ceil(this.value)).trigger('change');
                }
            });
            $(this).append(function() {});
        }, {
            accY: 20
        });
    }



    //Hidden Sidebar
    if ($('.hidden-bar').length) {
        var hiddenBar = $('.hidden-bar');
        var hiddenBarOpener = $('.hidden-bar-opener');
        var hiddenBarCloser = $('.hidden-bar-closer');
        var navToggler = $('.nav-toggler');

        //Show Sidebar
        hiddenBarOpener.on('click', function() {
            hiddenBar.toggleClass('visible-sidebar');
            navToggler.toggleClass('open');
        });

        //Hide Sidebar
        hiddenBarCloser.on('click', function() {
            hiddenBar.toggleClass('visible-sidebar');
            navToggler.toggleClass('open');
        });
    }




    // Popular Causes Progress Bar
    if ($('.count-bar').length) {
        $('.count-bar').appear(function() {
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width', percent).addClass('counted');
        }, {
            accY: -50
        });

    }



    // Banner Section One Carousel
    if ($('.banner-section-one-carousel').length) {
        $('.banner-section-one-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            mouseDrag: false,
            margin: 0,
            dots: false,
            nav: false,
            singleItem: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="flaticon-left-arrow-1"></span>', '<span class="flaticon-left-arrow-1 right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    // One item carousel
    if ($('.one-item-carousel').length) {
        $('.one-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            mouseDrag: false,
            dots: true,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    // Two item carousel
    if ($('.two-item-carousel').length) {
        var myCarousel3 = $('.two-item-carousel');
        var nextBtn3 = $('.carousel-nav-btn-s-1-next3');
        var prevBtn3 = $('.carousel-nav-btn-s-1-prev3');
        myCarousel3.owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            mouseDrag: false,
            nav: false,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                992: {
                    items: 2
                }
            }
        });
        nextBtn3.on('click', function () {
            myCarousel3.trigger('next.owl.carousel', [300]);
            return false;
        });
        prevBtn3.on('click', function () {
            myCarousel3.trigger('prev.owl.carousel', [300]);
            return false;
        });
    }

    // Three item carousel
    if ($('.three-item-carousel').length) {
        $('.three-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Four item carousel
    if ($('.four-item-carousel').length) {
        $('.four-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    }

    // Five item carousel
    if ($('.five-item-carousel').length) {
        $('.five-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1199: {
                    items: 5
                }
            }
        });
    }

    if ($('.mission-item-carousel').length) {
        $('.mission-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                1200: {
                    items: 2
                },
                1600: {
                    items: 3
                }
            }
        });
    }

    if ($('.causes-item-carousel').length) {
        
        var myCarousel1 = $('.causes-item-carousel');
        var nextBtn1 = $('.carousel-nav-btn-s-1-next1');
        var prevBtn1 = $('.carousel-nav-btn-s-1-prev1');
        myCarousel1.owlCarousel({
            loop: false,
            margin: 30,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        });
        
        nextBtn1.on('click', function () {
            myCarousel1.trigger('next.owl.carousel', [300]);
            return false;
        });
        prevBtn1.on('click', function () {
            myCarousel1.trigger('prev.owl.carousel', [300]);
            return false;
        });
    }

    if ($('.causes-item-carousel-fresh').length) {
        
        var myCarousel1 = $('.causes-item-carousel-fresh');
        var nextBtn1 = $('.carousel-nav-btn-next-fresh');
        var prevBtn1 = $('.carousel-nav-btn-prev-fresh');
        myCarousel1.owlCarousel({
            loop: false,
            margin: 30,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        });
        
        nextBtn1.on('click', function () {
            myCarousel1.trigger('next.owl.carousel', [300]);
            return false;
        });
        prevBtn1.on('click', function () {
            myCarousel1.trigger('prev.owl.carousel', [300]);
            return false;
        });
    }

    if ($('.causes-item-carousel-oluyole').length) {
        
        var myCarousel1 = $('.causes-item-carousel-oluyole');
        var nextBtn1 = $('.carousel-nav-btn-next-oluyole');
        var prevBtn1 = $('.carousel-nav-btn-prev-oluyole');
        myCarousel1.owlCarousel({
            loop: false,
            margin: 30,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        });
        
        nextBtn1.on('click', function () {
            myCarousel1.trigger('next.owl.carousel', [300]);
            return false;
        });
        prevBtn1.on('click', function () {
            myCarousel1.trigger('prev.owl.carousel', [300]);
            return false;
        });
    }

    if ($('.causes-item-carousel-amuludun').length) {
        
        var myCarousel1 = $('.causes-item-carousel-amuludun');
        // var nextBtn1 = $('.carousel-nav-btn-s-1-next-amuludun');
        // var prevBtn1 = $('.carousel-nav-btn-s-1-prev-amuludun');
        myCarousel1.owlCarousel({
            loop: false,
            margin: 30,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        });
        
        // nextBtn1.on('click', function () {
        //     myCarousel1.trigger('next.owl.carousel', [300]);
        //     return false;
        // });
        // prevBtn1.on('click', function () {
        //     myCarousel1.trigger('prev.owl.carousel', [300]);
        //     return false;
        // });
    }

    if ($('.causes-item-carousel2').length) {
        
        var myCarousel2 = $('.causes-item-carousel2');
        var nextBtn2 = $('.carousel-nav-btn-s-1-next2');
        var prevBtn2 = $('.carousel-nav-btn-s-1-prev2');
        myCarousel2.owlCarousel({
            loop: false,
            margin: 30,
            dots: true,
            mouseDrag: false,
            nav: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        });
        
        nextBtn2.on('click', function () {
            myCarousel2.trigger('next.owl.carousel', [300]);
            return false;
        });
        prevBtn2.on('click', function () {
            myCarousel2.trigger('prev.owl.carousel', [300]);
            return false;
        });
    }



    //Progress Bar / Levels
    if ($('.progress-levels .progress-box .bar-fill').length) {
        $(".progress-box .bar-fill").each(function() {
            var progressWidth = $(this).attr('data-percent');
            $(this).css('width', progressWidth + '%');
            $(this).children('.percent').html(progressWidth + '%');
        });
    }

    var offset = 220;
        var duration = 500;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }
        });
        
        jQuery('.back-to-top').on("click", function(){
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
    });

    if ($('.ajax-sub-form').length > 0) {
        $('.ajax-sub-form').ajaxChimp({
            language: 'es',
            url: "https://gmail.us17.list-manage.com/subscribe/post?u=8a43765a655b07d21fa500e4e&amp;id=2eda0a58a7" //Replace this with your mailchimp post URL.
        });

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: 'Thanks for your subscription',
            1: 'Please enter a valid email',
            2: 'An email address must contain a single @',
            3: 'The domain portion of the email address is invalid (the portion after the @: )',
            4: 'The username portion of the email address is invalid (the portion before the @: )',
            5: 'This email address looks fake or invalid. Please enter a real email address'
        };
    }



    $('.donation-form-one-price-value').on('click', function(e) {
        e.preventDefault();
        $('.active-price-value').removeClass('active-price-value');
        $('.other-input').hide().siblings('#other').show();
        $(this).filter('.donation-form-one-price-value').addClass("active-price-value");
        var value = $(this).data('impact');
        $(this).closest('div').find('p').text("" + value);
        $('.other-input').find('input').val('');  
    });
        
    $('.donate_button').on('click', function() {
        var dollar;
        var input = $('.other-input').find('input').val();
        if ( !input ) {
        dollar = $('.active-price-value').data('dollars');
        } else if ( $.trim(input) === '' || isNaN(input)) {
        // empty space leaves value = 'undefined'. 
        // Have to fix $.trim(input) == '' above so that it works.
        console.log('Yes');
        dollar = "Please enter a number."; 
        } else {
        dollar = input;
        }
        $('.donate-price').text(""+dollar);
    });

    $('.donate_button').on('click', function() {
        $('.donate-fomr-popup').fadeIn(300);
    }); 
    $('.donate-fomr-popup-close').on('click', function() {
        $('.donate-fomr-popup').fadeOut(300);
    });

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }



    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    jQuery(window).on('scroll', function() {
        headerStyle();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    jQuery(window).on('load', function() {
        sortableMasonry();
        bannerSlider();
    });

})(window.jQuery);