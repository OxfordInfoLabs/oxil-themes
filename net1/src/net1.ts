import * as queryString from '../node_modules/query-string/index';

var hljs = require('../node_modules/highlight.js/lib/highlight');

import * as bash from '../node_modules/highlight.js/lib/languages/bash';
import * as php from '../node_modules/highlight.js/lib/languages/php';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('php', php);
import '../node_modules/highlight.js/styles/darkula.css';
import tippy from '../node_modules/tippy.js/dist/tippy.esm';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import "../node_modules/cookie-notice/dist/cookie.notice.min";


declare var window: any;

var filtersDomainSearchBtns: NodeList = document.querySelectorAll('.btn-filters-domain-search');
var filtersDomainSearch: HTMLElement = document.querySelector('#filters-domain-search');
var blogNewsBtn: HTMLElement = document.querySelector('#btn-blognews');
var blogNews: HTMLElement = document.querySelector('#blognews');
var logoutMenuBtn: HTMLElement = document.querySelector('#btn-logout-menu');
var logoutMenu: HTMLElement = document.querySelector('#logout-menu');
var sidebarBtn: HTMLElement = document.querySelector('#btn-sidebar');


hljs.initHighlightingOnLoad();


function defaultState() {

    if (blogNews)
        blogNews.setAttribute('data-state', 'hide');

    if (filtersDomainSearch)
        filtersDomainSearch.setAttribute('data-state', 'hide');

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


function scrollFunction(scrollElementA, scrollElementB) {
    if (scrollElementA.scrollTop > 150 || (scrollElementB && scrollElementB.scrollTop > 150)) {

        (<HTMLElement>document.querySelector('.scroll-to-top')).style.display = 'block';

    } else {
        (<HTMLElement>document.querySelector('.scroll-to-top')).style.display = 'none';


    }
}

function topFunction() {
    var scrollElement = document.querySelector('#fixedwrap');
    if (scrollElement) scrollElement.scrollTo({top: 0, behavior: 'smooth'});
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
                        (<HTMLElement>item.nextElementSibling).style.display = 'none';
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
                var queryParams = queryString.parse(location.search);
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



if (logoutMenuBtn)
    logoutMenuBtn.addEventListener('click', function (e) {

        if (this.getAttribute('data-target') === 'show') {
            defaultState();
            gauze();
            this.setAttribute('data-target', 'hide');
            logoutMenu.setAttribute('data-state', 'show');
        } else {
            this.setAttribute('data-target', 'show');
            defaultState();
        }

    });


if (blogNewsBtn)
    blogNewsBtn.addEventListener('click', function (e) {

        if (this.getAttribute('data-target') === 'show') {
            defaultState();
            gauze();
            this.setAttribute('data-target', 'hide');
            blogNews.setAttribute('data-state', 'show');
        } else {
            this.setAttribute('data-target', 'show');
            defaultState();
        }

    });

filtersDomainSearchBtns.forEach((filtersDomainSearchBtn: HTMLElement) => {

    filtersDomainSearchBtn.addEventListener('click', function (e) {

        if (this.getAttribute('data-target') === 'show') {
            defaultState();
            gauze();
            this.setAttribute('data-target', 'hide');
            filtersDomainSearch.setAttribute('data-state', 'show');
        } else {
            this.setAttribute('data-target', 'show');
            defaultState();
        }

    });
});

if (sidebarBtn)
    sidebarBtn.addEventListener('click', function () {
        if (this.getAttribute('data-target') === 'show') {
            defaultState();
            gauze();
            this.setAttribute('data-target', 'hide');
            document.querySelector('body').setAttribute('data-sidebar', 'show');
        } else {
            this.setAttribute('data-target', 'show');
            defaultState();
        }
    });


let netDomainSearch = document.querySelector('net-domain-search');
if (netDomainSearch)
    netDomainSearch.addEventListener('search', function () {

        tippy('net-domain-search .pop', {
            content(reference) {
                const template = reference.nextElementSibling;
                return template.innerHTML;
            },
            trigger: 'click'
        });
    });


document.querySelectorAll('.scroll-to-top').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        topFunction();
    })
});


bindDropdowns();


document.querySelectorAll('.btn-close-sidebar').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        defaultState();
    });
});

document.querySelectorAll('.btn-close-sidebar-logged').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        defaultState();
    });
});

document.querySelectorAll('.gauze').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        defaultState();
    });
});

document.querySelectorAll('.close-menu').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        defaultState();
    });
});

window.addEventListener("resize", () => {
    defaultState();
});


let toolsFiltersButton = document.querySelector('#toolsfilters button');
if (toolsFiltersButton)
    toolsFiltersButton.addEventListener('click', function () {
        (<HTMLElement>document.querySelector('#toolsfilters')).style.display = 'none';
    });



document.querySelectorAll('ul.tabs li').forEach((item: HTMLElement) => {

    item.addEventListener("click", function () {
        var tab_id = this.getAttribute('data-tab');

        document.querySelectorAll('ul.tabs li').forEach((item: HTMLElement) => {
            item.classList.remove('current');
        });

        document.querySelectorAll('.tab-content').forEach((item: HTMLElement) => {
            item.classList.remove('current');
        });

        this.classList.add('current');

        document.querySelector("#" + tab_id).classList.add('current');
    });
});

document.querySelectorAll('.add-domain').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        this.closest('.prod').classList.add('prod-selected');
    });
});


document.querySelectorAll('[data-navigate-back]').forEach((item: HTMLElement) => {
    item.addEventListener('click', function () {
        window.history.back();
    });
});

tippy('[data-tippy-content]', {
    trigger: 'click'
});




