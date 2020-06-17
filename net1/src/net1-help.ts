import * as lunr from '../node_modules/lunr/lunr.js';

var lunrIndex, $results, $search, pagesIndex;


function initLunr() {

    fetch("/search-index.json")
        .then(function (response) {

            response.json().then(index => {

                pagesIndex = index.results;
                lunrIndex = lunr(function () {
                    this.field("title", {boost: 10});
                    this.field("tags", {boost: 5});
                    this.field("categories", {boost: 5});
                    this.field("content");
                    this.field("snippet");
                    this.ref("uri");

                    pagesIndex.forEach(function (page) {
                        this.add(page)
                    }, this)
                });
            });

        })
        .catch(function (error) {
            var err = error;
            console.error("Error getting Hugo index flie:", err);
        });
}

// Nothing crazy here, just hook up a listener on the input field
function initUI() {
    $results = document.getElementById("results");
    $search = document.getElementById("search");

    if ($results && $search) {

        $search.addEventListener("keyup", function () {
            $results.innerHTML = "";

            // Only trigger a search when 2 chars. at least have been provided
            var query = (<HTMLInputElement>this).value;
            if (query.length < 2) {
                return;
            }

            var results = search(query);

            renderResults(results);
        });

    }
}


/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    return lunrIndex.search(query).map(function (result) {
        return pagesIndex.filter(function (page) {
            return page.uri === result.ref;
        })[0];
    });
}

/**
 * Display the 10 first results
 *
 * @param  {Array} results to display
 */
function renderResults(results) {
    if (!results.length) {
        return;
    }


    let htmlString = '';

    htmlString += '<h4 class="pt150 mt0 uppercase">Search results: </h4>';

    // Only show the ten first results
    results.slice(0, 100).forEach(function (result) {
        htmlString += '<h4 class="mb0 "><a class="bold inv" href="' + result.uri + '">' + result.title + '</a></h4>';
        htmlString += '<p class="small mb0"><a class="normal inv brand-2-text" href="' + result.uri + '">' + result.uri + '</a></p>';
        htmlString += '<p class="small">' + result.snippet + ' ...</p>';
    });

    htmlString += '<div class="pb3">&nbsp;</div>';
    $results.innerHTML = htmlString;
}

// Let's get started
initLunr();


initUI();
