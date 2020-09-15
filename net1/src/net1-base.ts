var hljs = require('highlight.js/lib/highlight');

import * as bash from 'highlight.js/lib/languages/bash';
import * as php from 'highlight.js/lib/languages/php';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('php', php);
import 'highlight.js/styles/darkula.css';
import tippy from 'tippy.js/dist/tippy.esm';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import "cookie-notice/dist/cookie.notice.min";

declare var window: any;

// Default state
function defaultState() {

    var blogNews: HTMLElement = document.querySelector('#blognews');
    if (blogNews)
        blogNews.setAttribute('data-state', 'hide');

    var filtersDomainSearch: HTMLElement = document.querySelector('#filters-domain-search');
    if (filtersDomainSearch)
        filtersDomainSearch.setAttribute('data-state', 'hide');

    var logoutMenu: HTMLElement = document.querySelector('#logout-menu');
    if (logoutMenu)
        logoutMenu.setAttribute('data-state', 'hide');

    document.querySelectorAll('[data-target="hide"]').forEach((item: HTMLElement) => {
        item.setAttribute('data-target', 'show');
    });
    document.querySelector('body').setAttribute('data-gauze', 'hide');
    document.querySelector('body').setAttribute('data-sidebar', 'hide');

}

function gauze() {
    document.querySelector('body').setAttribute('data-gauze', 'show');
}


function topFunction() {
    var scrollElement = document.querySelector('#fixedwrap');
    if (scrollElement) {
        if (scrollElement.scrollTo)
            scrollElement.scrollTo({top: 0, behavior: 'smooth'});
        else
            scrollElement.scrollTop = 0;
    }
}


var bindDropdowns = function () {

    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {

        if (!dropdown[i].getAttribute("bound")) {

            dropdown[i].addEventListener("click", function (event) {

                let thisButton = this;

                document.querySelectorAll(".dropdown-btn").forEach(item => {
                    if (item !== thisButton) {
                        item.classList.remove("active");
                        let sibling = (<HTMLElement>item.nextElementSibling);
                        if (sibling) sibling.style.display = 'none';
                    }
                });

                this.classList.toggle("active");

                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });

            dropdown[i].setAttribute("bound", "1");


            dropdown[i].nextElementSibling.addEventListener("sourceLoaded", function () {

                var queryParamsSplit = window.location.href.split("?");
                queryParamsSplit = queryParamsSplit.pop().split("&");

                let queryParams: any = {};
                queryParamsSplit.forEach(function (item) {
                    let splitParam = item.split("=");
                    queryParams[splitParam[0]] = splitParam[1];
                });


                if (queryParams.api) {
                    if (queryParams.method) {
                        document.querySelectorAll('.dropdown-btn.api-menu-' + queryParams.api).forEach(item => {
                            item.classList.add("active");
                        });


                        document.querySelectorAll('.dropdown-container.api-menu-' + queryParams.api).forEach((item: HTMLElement) => {
                            item.style.display = 'block';
                        });


                        document.querySelectorAll('.dropdown-container.api-menu-' + queryParams.api + " ." + queryParams.method).forEach((item: HTMLElement) => {
                            item.classList.add("active");
                        });
                    }


                }
                if (queryParams["object"]) {
                    document.querySelectorAll('.dropdown-btn.api-object').forEach((item: HTMLElement) => {
                        item.classList.add("active");
                    });
                    document.querySelectorAll('.dropdown-container.api-object').forEach((item: HTMLElement) => {
                        item.style.display = 'block';
                    });

                    document.querySelectorAll(".dropdown-container.api-object a[path='" + queryParams["object"] + "']").forEach((item: HTMLElement) => {
                        item.classList.add("active");
                    });
                }

                if (queryParams["exception"]) {
                    document.querySelectorAll('.dropdown-btn.api-exception').forEach((item: HTMLElement) => {
                        item.classList.add("active");
                    });
                    document.querySelectorAll('.dropdown-container.api-exception').forEach((item: HTMLElement) => {
                        item.style.display = 'block';
                    });
                    document.querySelectorAll(".dropdown-container.api-exception a[path='" + queryParams["exception"] + "']").forEach((item: HTMLElement) => {
                        item.classList.add("active");
                    });

                }


            });

        }
    }
}


// Bind body clicks to detect clicks on dynamic elements.
let body = document.querySelector("body");
body.addEventListener('click', function (event) {

    let targetElement = <HTMLElement>event.target;

    let matchedTarget = null;

    if (matchedTarget = targetMatchesId(targetElement, "btn-sidebar"))
        toggleSidebar(matchedTarget);

    else if (matchedTarget = targetMatchesId(targetElement, "btn-logout-menu"))
        toggleLogoutMenu(matchedTarget);

    else if (matchedTarget = targetMatchesId(targetElement, 'btn-blognews'))
        toggleBlogNews(matchedTarget);

    else if (matchedTarget = targetMatchesClass(targetElement, 'btn-close-sidebar')) {
        defaultState();
    } else if (matchedTarget = targetMatchesClass(targetElement, 'btn-close-sidebar-logged')) {
        defaultState();
    } else if (matchedTarget = targetMatchesClass(targetElement, 'gauze')) {
        defaultState();
    } else if (matchedTarget = targetMatchesClass(targetElement, 'close-menu')) {
        defaultState();
    } else if (matchedTarget = targetMatchesClass(targetElement, 'btn-filters-domain-search')) {
        toggleFilters(matchedTarget);
    } else if (matchedTarget = targetMatchesClass(targetElement, 'tab-link')) {
        toggleTabs(matchedTarget);
    } else if (matchedTarget = targetMatchesCSS(targetElement, '[data-copy-to-clipboard]')) {
        copyToClipboard(targetElement);
    }


});


function targetMatchesId(targetElement, id) {

    if (targetElement.id != id) {
        targetElement = targetElement.parentElement;
        if (targetElement.id != id) {
            targetElement = null;
        }
    }
    return targetElement;
}


function targetMatchesClass(targetElement, className) {

    if (!targetElement.classList.contains(className)) {
        targetElement = targetElement.parentElement;
        if (!targetElement.classList.contains(className)) {
            targetElement = null;
        }
    }
    return targetElement;

}


function targetMatchesCSS(targetElement, css) {
    return targetElement.matches(css);
}


function toggleSidebar(targetElement) {

    if (targetElement.getAttribute('data-target') === 'show') {
        defaultState();
        gauze();
        targetElement.setAttribute('data-target', 'hide');
        document.querySelector('body').setAttribute('data-sidebar', 'show');
    } else {
        targetElement.setAttribute('data-target', 'show');
        defaultState();
    }
}

function toggleLogoutMenu(targetElement) {

    if (targetElement.getAttribute('data-target') === 'show') {
        defaultState();
        gauze();
        targetElement.setAttribute('data-target', 'hide');
        document.querySelector('#logout-menu').setAttribute('data-state', 'show');
    } else {
        targetElement.setAttribute('data-target', 'show');
        defaultState();
    }

}


function toggleBlogNews(targetElement) {
    if (targetElement.getAttribute('data-target') === 'show') {
        defaultState();
        gauze();
        targetElement.setAttribute('data-target', 'hide');
        document.querySelector('#blognews').setAttribute('data-state', 'show');
    } else {
        this.setAttribute('data-target', 'show');
        defaultState();
    }
}

function toggleFilters(targetElement) {

    if (targetElement.getAttribute('data-target') === 'show') {
        defaultState();
        gauze();
        targetElement.setAttribute('data-target', 'hide');
        document.querySelector('#filters-domain-search').setAttribute('data-state', 'show');
    } else {
        targetElement.setAttribute('data-target', 'show');
        defaultState();
    }

}


function toggleTabs(targetElement) {

    var tab_id = targetElement.getAttribute('data-tab');

    document.querySelectorAll('.tab-link').forEach((item: HTMLElement) => {
        item.classList.remove('current');
    });

    document.querySelectorAll('.tab-content').forEach((item: HTMLElement) => {
        item.classList.remove('current');
    });

    targetElement.classList.add('current');

    document.querySelector("#" + tab_id).classList.add('current');

}


function copyToClipboard(copyElement) {

    let element = document.querySelector(copyElement.getAttribute("data-copy-to-clipboard"));

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");

    selection.removeAllRanges();

}


document.querySelector("#fixedwrap").addEventListener("scroll", () => {

    document.querySelectorAll('.scroll-to-top').forEach((item: HTMLElement) => {

        let fixedWrap = document.querySelector("#fixedwrap");

        if (fixedWrap.scrollTop > 100) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

});

document.querySelectorAll('.scroll-to-top').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        topFunction();
    })
});


bindDropdowns();


window.addEventListener("resize", () => {
    defaultState();
});


let toolsFiltersButton = document.querySelector('#toolsfilters button');
if (toolsFiltersButton)
    toolsFiltersButton.addEventListener('click', function () {
        (<HTMLElement>document.querySelector('#toolsfilters')).style.display = 'none';
    });


document.querySelectorAll('.add-domain').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        this.closest('.prod').classList.add('prod-selected');
    });
});


document.querySelectorAll('[data-navigate-back]').forEach((item: HTMLElement) => {
    item.addEventListener('click', function (e) {

      e.preventDefault();
        window.history.back();
    });
});

tippy('[data-tippy-content]', {
    trigger: 'click'
});

(<any>window).tippy = tippy;

// Handle rehighlight situations
let rehighliters = document.querySelectorAll("[data-rehighlight]");

if (rehighliters.length == 0) {
    hljs.initHighlightingOnLoad();
} else {

    rehighliters.forEach((element => {

        element.addEventListener("sourceLoaded", () => {
            setTimeout(() => {
                hljs.initHighlighting();
            }, 100);
        });

    }));

}


