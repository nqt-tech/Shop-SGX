/*

[Main Script]

Project     : USNews - Multipurpose News, Magazine and Blog HTML5 Template
Author      : themelooks.com
Author URI  : https://themeforest.net/user/themelooks

*/

;(function ($) {
    "use strict";
    
    /* ------------------------------------------------------------------------- *
     * COMMON VARIABLES
     * ------------------------------------------------------------------------- */
    var $wn = $(window),
        $document = $(document),
        $body = $('body'),
        isRTL = $('html').attr('dir') === 'rtl' ? true : false;

    $(function () {
        /* ------------------------------------------------------------------------- *
         * HEADER SECTION
         * ------------------------------------------------------------------------- */
        var $headerSearchForm = $('.header--search-form');

        $headerSearchForm.on('click', '.btn', function (e) {
            $headerSearchForm.addClass('active');

            setTimeout(function () {
                $headerSearchForm.children('.form-control').trigger('focus');

                $document.on('click.headerSearchForm', function (e) {
                    e.$target = $( e.target );

                    if ( e.$target.not('.header--search-form').length === 0 || e.$target.parents('.header--search-form').length === 0 ) {
                        $headerSearchForm.removeClass('active');
                        $document.off('click.headerSearchForm');
                    }
                });
            }, 200);
        });

        var $headerNavbar = $('.header--navbar'),
            $headerNavbarToggle = $('.header--navbar .navbar-toggle'),
            $headerNav = $('#headerNav');

        $headerNavbarToggle.on('click', function (e) {
            setTimeout(function () {
                $document.on('click.headerNavbarToggle', function (e) {
                    e.$target = $( e.target );

                    if ( e.$target.parents('#headerNav').length === 0 ) {
                        $headerNav.removeClass('in');
                        $headerNavbarToggle.addClass('collapsed');
                        $document.off('click.headerNavbarToggle');
                    }
                });
            }, 200);
        });

        
    });
    
    $wn.on('load', function () {
        /* ------------------------------------------------------------------------- *
         * BODY SCROLLING
         * ------------------------------------------------------------------------- */
        var isBodyScrolling = function () {
            if ( $wn.scrollTop() > 1 ) {
                $body.addClass('isScrolling');
            } else {
                $body.removeClass('isScrolling');
            }
        };

        isBodyScrolling();
        $wn.on('scroll', isBodyScrolling);

        /* ------------------------------------------------------------------------- *
         * ADJUST ROW
         * ------------------------------------------------------------------------- */
        var $adjustRow = $('.AdjustRow');
        
        if ( $adjustRow.length ) {
            $adjustRow.isotope({
                originLeft: isRTL ? false : true,
                layoutMode: 'fitRows'
            });
        }

        /* ------------------------------------------------------------------------- *
         * DROPDOWN MENU
         * ------------------------------------------------------------------------- */
        var $headerDropdownMenu = $('.header--navbar .dropdown-menu'),
            $headerDropdownMenuChild = $headerDropdownMenu.children('.dropdown');

        $headerDropdownMenu.each(function () {
            var $t = $(this),
                $parent = $t.parent('li'),
                space = $parent.parents('.container').width() - ($parent.position().left - 15),
                spaceRTL = ($parent.position().left - 15) + $parent.width();

            if ( $parent.parent('ul.nav').length && !$parent.hasClass('megamenu') ) {
                if ( isRTL && spaceRTL < $t.width() ) {
                    $parent.addClass('dropdown-left');
                } else if ( space < $t.width() ) {
                    $parent.addClass('dropdown-left');
                }
            }
        });

        if ( $headerDropdownMenuChild.length ) {
            $headerDropdownMenuChild.on('mouseenter', function () {
                var $t = $(this);

                if ( typeof $t.data('switch') === 'undefined' ) {
                    setTimeout(function () {
                        var $dropdown = $t.children('.dropdown-menu'),
                            $parent = $t.parents('.dropdown'),
                            a = $t.parents('.container').width(),
                            b = ( $parent.position().left - 15 ) + $t.width(),
                            c = b + $dropdown.width(),
                            e = ( $parent.position().left - 15 ) + $parent.width(),
                            f = $t.width() + $dropdown.width(),
                            g = '';

                        $t.addClass(function () {
                            if ( (isRTL && f > e) || (!isRTL && c < a) ) {
                                return 'switch--right';
                            } else if ( (isRTL && f < e) || (!isRTL && c > a) ) {
                                return 'switch--left';
                            }
                        }).attr('data-switch', true);
                    }, 420);
                }
            });
        }

        $headerDropdownMenuChild.on('click', '.dropdown-toggle', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        /* ------------------------------------------------------------------------- *
         * GOGGLE PLUS WIDGET
         * ------------------------------------------------------------------------- */
        var $gPlusWidgetDiv = $('.google-plus--widget > .g-page');

        $gPlusWidgetDiv.each(function (i) {
            var $t = $(this);

            $t.attr( 'data-width', $t.parent().width() );

            if ( $gPlusWidgetDiv.length === (i + 1) && typeof gapi !== 'undefined' ) {
                gapi.page.go();
            }
        });
        
        /* ------------------------------------------------------------------------- *
         * PORTFOLIO SECTION
         * ------------------------------------------------------------------------- */
        var $portfolio = $('.portfolio--section'),
            $portfolioItems = $portfolio.find('.portfolio--items');

        if ( $portfolioItems.length ) {
            $portfolioItems.isotope({
                animationEngine: 'best-available',
                itemSelector: '.portfolio--item'
            });
        }

        /* ------------------------------------------------------------------------- *
         * PRELOADER
         * ------------------------------------------------------------------------- */
        var $bodyPreloader = $('#preloader');

        if ( $bodyPreloader.length ) {
            $bodyPreloader.fadeOut('slow');
        }
    });

})(jQuery);
