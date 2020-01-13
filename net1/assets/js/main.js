
function defaultState(){
    $('body').removeClass('sidebar-open');
    $('body').removeClass('with-gauze');
    $('.expand-menu').removeClass('active');
    $('#btn-more-menu').addClass('open-more-menu');
    $('#btn-logout-menu').addClass('open-logout-menu');
    $('#btn-blognews').addClass('open-blognews');
}

function gauze() {
    $('body').addClass('with-gauze');
}


function openSidebar() {

    $('body').addClass('sidebar-open with-gauze');
    // $('.btn-open-sidebar-sm').css('display', 'none');
    // $('.btn-close-sidebar-sm').css('display', 'flex');
}

function closeSidebar() {

    $('body').removeClass('sidebar-open');
    // $('.btn-open-sidebar-sm').css('display', 'flex');
    // $('.btn-close-sidebar-sm').css('display', 'none');
}

function scrollFunction(scrollElementA, scrollElementB) {
    if (scrollElementA.scrollTop > 20 || (scrollElementB && scrollElementB.scrollTop > 20)) {

        $('.scroll-to-top').css('display', 'block');
        $('.toptools').removeAttr('style');
        $('.toptools').removeClass('closed');

    } else {
        $('.scroll-to-top').css('display', 'none');
        $('.toptools').addClass('closed');

    }
}

function topFunction() {
    // document.body.scrollTo({top: 0, behavior: 'smooth'});
    // document.documentElement.scrollTo({top: 0, behavior: 'smooth'}); // For Chrome, Firefox, IE and Opera
    var scrollElement = $('#fixedwrap').get(0);
    if (scrollElement) scrollElement.scrollTo({top: 0, behavior: 'smooth'});
}



var bindDropdowns = function () {

    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {

        if (!dropdown[i].getAttribute("bound")) {

            dropdown[i].addEventListener("click", function () {

                $(".dropdown-btn").not($(this)).removeClass("active");
                $(".dropdown-btn").not($(this)).next().hide();

                this.classList.toggle("active");
                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });

            dropdown[i].setAttribute("bound", 1);


            dropdown[i].nextElementSibling.addEventListener("sourceLoaded", function () {
                var queryParams = getParams(window.location.href);
                if (queryParams.api) {
                    if (queryParams.method) {
                        $('.dropdown-btn.api-menu-' + queryParams.api).addClass("active");
                        $('.dropdown-container.api-menu-' + queryParams.api).show();
                        $('.dropdown-container.api-menu-' + queryParams.api + " ." + queryParams.method).addClass("active");
                    }


                }
                if (queryParams["object"]) {
                    $('.dropdown-btn.api-object').addClass("active");
                    $('.dropdown-container.api-object').show();
                    $(".dropdown-container.api-object a[path='" + queryParams["object"] + "']").addClass("active");
                }

                if (queryParams["exception"]) {
                    $('.dropdown-btn.api-exception').addClass("active");
                    $('.dropdown-container.api-exception').show();
                    $(".dropdown-container.api-exception a[path='" + queryParams["exception"] + "']").addClass("active");

                }


            });

        }
    }
}


$(document).ready(function () {

    var blogNewsBtn = $('#btn-blognews');
    var blogNews = $('#blognews');
    var logoutMenuBtn = $('#btn-logout-menu');
    var logoutMenu = $('#logout-menu');
    var moreMenuBtn = $('#btn-more-menu');
    var moreMenu = $('#more-menu');
    var rowInfoBtn = $('.toggle-row-info');
    var closeRowInfoBtn = $('.close-row-info');

    logoutMenuBtn.on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('open-logout-menu')){
            defaultState();
            $(this).removeClass('open-logout-menu');
            $(this).addClass('close-menu');
            logoutMenu.removeAttr('style');
            logoutMenu.addClass('active');
            gauze();
        } else {
            $(this).removeClass('close-menu');
            defaultState();
        }

    });


    moreMenuBtn.on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('open-more-menu')){
            defaultState();
            $(this).removeClass('open-more-menu');
            $(this).addClass('close-menu');
            moreMenu.removeAttr('style');
            moreMenu.addClass('active');
            gauze();
        } else {
            $(this).removeClass('close-menu');
            defaultState();
        }

    });

    blogNewsBtn.on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('open-blognews')){
            defaultState();
            $(this).removeClass('open-blognews');
            $(this).addClass('close-menu');
            blogNews.removeAttr('style');
            blogNews.addClass('active');
            gauze();
        } else {
            $(this).removeClass('close-menu');
            defaultState();
        }

    });



    rowInfoBtn.on('click', function (e) {
        e.preventDefault();
        $(this).closest('.item').siblings().find('.expand-menu').removeClass('active');

        $(this).closest('.item').find('.expand-menu').toggleClass('active');

    });


    closeRowInfoBtn.on('click', function (e) {
        $(this).closest('.item').siblings().find('.expand-menu').removeClass('active');

        $(this).closest('.expand-menu').removeClass('active');

    });


    $('#fixedwrap').on("scroll", function () {
        scrollFunction(this);

    });


    $('.scroll-to-top').on('click', function () {
        topFunction();
    })


    bindDropdowns();


    $('.btn-open-sidebar').on('click', function () {
        defaultState();
        openSidebar();
    });

    $('.btn-close-sidebar').on('click', function () {
        defaultState();
    });

    $('.gauze').on('click', function () {
        defaultState();
    });

    $('.close-menu').on('click', function () {
        defaultState();
    });

    $(window).resize(function(){
        defaultState();
    });

    $('#toolsfilters button').on('click', function () {
        $('#toolsfilters').hide();
    });



});

var onloadCallback = function () {
};
