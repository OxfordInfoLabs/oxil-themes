/**
 * Endless scroll class
 */
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";

export default class EndlessScroll extends HTMLElement {

    private _currentResults;

    private _lastResults;

    // Constructor
    constructor() {
        super();
        this.init();
    }


    /**
     * Get observed attributes
     */
    static get observedAttributes() {
        return ['data-last-results'];
    }


    /**
     * Changed callback
     *
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {

        if (name == 'data-last-results' && newValue)
            this._currentResults = newValue;
    }


    // Init method
    private init() {

        let scrollContainer = <HTMLElement>(this.hasAttribute("data-scroll-container") ? document.querySelector(this.getAttribute("data-scroll-container")) : window);
        let pageSizeParam = this.hasAttribute("data-page-size-param") ? this.getAttribute("data-page-size-param") : "pageSize";

        let view = new AuthKinibind(this, {});


        scrollContainer.addEventListener("scroll", () => {

            let myBottom = this.getBoundingClientRect().bottom;
            let innerHeight = scrollContainer.getBoundingClientRect().bottom;

            let pageSize = this.hasAttribute("data-page-size-increment") ? Number(this.getAttribute("data-page-size-increment")) : 10;

            if (myBottom < innerHeight && this._currentResults != this._lastResults) {
                this._lastResults = this._currentResults;
                view.model[pageSizeParam] = Number(view.model[pageSizeParam]) + Number(pageSize);
            }

        });

    }


}
