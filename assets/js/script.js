/*
* -----------------------------------------------------------
* Template Name    : Viola | Personal, Portfolio Template
* Author           : dawnthemes
* Version          : 1.0.0
* Created          : June 2020
* File Description : Main js file of the template
* ------------------------------------------------------------
*/

/************************
 * ------------------------
 1.IMAGES PRELOAD
 2.PRELOADER
 3.NAV
 4.PAGEPILING
 5.ISOTOPE ( PORTFOLIO )
 6.FEATHERLIGHT ( PORTFOLIO )
 * ------------------------
 *************************/

/*----------------------------------------
             IMAGES PRELOAD
----------------------------------------*/
"use strict";

$("[data-img]").each(function () {
    $('<img/>')[0].src = $(this).data('img');
});

$(window).on('load', function () {
    "use strict";


    /*----------------------------------------
                    PRELOADER
    ----------------------------------------*/
    $(".preloader").delay(1500).fadeOut(300);


    /*----------------------------------------
                       NAV
    ----------------------------------------*/
    $(".toggle-menu").click(function () {
        $("main, nav, .toggle-menu, .logo").toggleClass("show-menu");
    });

    if ($(window).width() < 1200) {
        $(".nav-link").click(function(){
            event.preventDefault();

            if(!$(this).hasClass("btn-goto-bg")) {
                $("main, nav, .toggle-menu, .logo").toggleClass("show-menu");
            }

            var elementOffset = $($(this).attr("href")).offset().top;
            $("html").animate({scrollTop: elementOffset});
        });
    }


    /*----------------------------------------
                   PAGEPILING
    ----------------------------------------*/
    if ($(window).width() > 1199) {
        $('#pagepiling').pagepiling({
            menu: '.menu-items',
            anchors: ['home', 'about', 'services', 'portfolio', 'contact'],
            direction: 'vertical',
            verticalCentered: true,
            scrollingSpeed: 700,
            navigation: false,
            easing: 'swing',
            loopBottom: false,
            loopTop: false,
            css3: true,
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: false,

            //events
            onLeave: function (index, nextIndex, direction) {

            },
            afterLoad: function (anchorLink, index) {
                var imgName = $("[href='#" + anchorLink + "']").data('img');
                var imgElement = $(".left-side .bg-img img");

                // change image after slide
                imgElement.css("transform", "scale(3)").fadeOut(700);
                setTimeout(function () {
                    imgElement.attr('src', imgName);
                    imgElement.fadeIn(1000).css("transform", "scale(1)");
                }, 800);

                // display section title
                var currentTitle = $(".sections-title ." + anchorLink + "-title");
                if(currentTitle.length) {
                    currentTitle.siblings().fadeOut(300);
                    setTimeout(function () {
                        currentTitle.fadeIn(300);
                    }, 350);
                } else {
                    $(".sections-title h2").fadeOut(300);
                }

            },
            afterRender: function () {
                var sectionName = window.location.href.split("#")[1];
                if(sectionName == undefined)
                    sectionName = 'home';

                if ([undefined, '', 'home'].indexOf(sectionName) == -1) {

                    // move to section
                    var sectionNameExist = $("#" + sectionName + ".section").length;
                    if (sectionNameExist) {
                        $.fn.pagepiling.moveTo(sectionName);
                    }
                }

                // display section title
                var currentTitle = $(".sections-title ." + sectionName + "-title");
                if(currentTitle.length) {
                    currentTitle.slideDown();
                } else {
                    $(".sections-title h2").fadeOut(300);
                }

            }
        });
    }


    /*----------------------------------------
                      SKILL
    ----------------------------------------*/
    $(".skill-item").each(function(){
        var progressBar = $(this).find(".progress-percent");
        var percent = progressBar.data("value");

        progressBar.animate({width: percent});
    })


    /*----------------------------------------
               ISOTOPE ( PORTFOLIO )
    ----------------------------------------*/
    var $container = $('.portfolio-items');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'packery',
            percentPosition: true
        });
    });

    // filter items on button click
    $('.portfolio-filter').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var filterValue = $(this).attr('data-filter');
        $container.isotope({filter: filterValue});
    });


    /*----------------------------------------
            FEATHERLIGHT ( PORTFOLIO )
    ----------------------------------------*/
    $.featherlight.defaults.afterOpen = function open() {
        $("main").css({"filter": "blur(12px)"});
    }

    $.featherlight.defaults.beforeClose = function close() {
        $("main").css({"filter": "blur(0px)"});
    }

});




