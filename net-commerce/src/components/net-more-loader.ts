/**
 * Generic more loader for loading more results from a url by updating the limit value in increments.
 */

import WhitelabelApi from "../framework/whitelabel-api";
import ElementSpinner from "kiniauth/ts/util/element-spinner";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";

export default class NetMoreLoader extends HTMLElement {

    // Kinibind view for state management
    private view;

    // Url
    private url;

    // Increment amount
    private increment = 10;

    // Initialise current increment.
    private currentIncrement = 0;

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise
    private init() {

        this.url = this.getAttribute("data-url");

        if (!this.url) {
            alert("You must supply a url to the more loader");
        }

        // Store increment for later
        this.increment = this.getAttribute("data-increment") ? Number(this.getAttribute("data-increment")) : 10;


        this.view = new AuthKinibind(
            this,
            {
                moreResults: []
            }
        );

        this.loadMoreResults(null);

        this.querySelectorAll(".more-results").forEach((item) => {
            var container = this;
            item.addEventListener("click", function () {
                container.loadMoreResults(this);
            });
        });

    }


    private loadMoreResults(spinElement) {
        this.currentIncrement += this.increment;

        let api = new WhitelabelApi();

        let url = this.url + (this.url.indexOf("?") > 0 ? "&" : "?") + "limit=" + this.currentIncrement;

        if (spinElement)
            ElementSpinner.spinElement(spinElement);

        api.callAPI(url).then(result => {
            this.view.model.moreResults = result;

            if (spinElement)
                ElementSpinner.restoreElement(spinElement);
        });

    }


}
