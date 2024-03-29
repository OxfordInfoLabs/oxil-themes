/**
 * Domain search component.  Manages the data sets used for drawing
 * search results.
 */
import NetDomainFilters from "./net-domain-filters";
import RequestParamSerialiser from "../util/request-param-serialiser";
import WhitelabelApi from "../framework/whitelabel-api";
import RequestParams from "kiniauth/ts/util/request-params";
import ElementSpinner from "kiniauth/ts/util/element-spinner";
import NetPackageBuilder from "./net-package-builder";


export default class NetDomainSearch extends NetPackageBuilder {

    private filters: NetDomainFilters;
    private currentChangedFilters;


    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
    }


    // Initialise function
    protected init() {

        this.currentChangedFilters = {"useNameGenerator": 1};

        // Add out model to the vue options
        super.init({
            results: {},
            filterValues: {},
            visibleSuggestions: {},
            selectedItems: {},
            toggleVisibleSuggestion: (domainName) => {

                let visibleSuggestions = this._view.model.visibleSuggestions;
                if (!visibleSuggestions[domainName]) {
                    this._view.addNewProperty(visibleSuggestions, domainName, false);
                }
                visibleSuggestions[domainName] = !visibleSuggestions[domainName];

                let event = document.createEvent("Event");
                event.initEvent("search", false, true);
                this.dispatchEvent(event);

            },
            toggleSelectedResult: (domainName) => {

                let selectedItems = this._view.model.selectedItems;

                if (!selectedItems[domainName]) {
                    this._view.addNewProperty(selectedItems, domainName, false);
                }

                selectedItems[domainName] = !selectedItems[domainName];

            }
        });


        // Stash the filters object.
        this.filters = document.querySelector("net-domain-filters");

        if (this.filters) {
            this.filters.addEventListener("filterChange", () => {

                this.filters = document.querySelector("net-domain-filters");

                this.currentChangedFilters = this.filters.changes;

                if (Object.keys(this.currentChangedFilters).length == 0) {
                    RequestParamSerialiser.unset("filters");
                } else {
                    // Update the current url for history purposes.
                    RequestParamSerialiser.set("filters", this.currentChangedFilters);
                }

                // Reissue search.
                this.search();
            });

            // Restore any encoded filters from the URL
            this.currentChangedFilters = RequestParamSerialiser.get("filters");
            if (this.currentChangedFilters) {
                this.filters.values = this.currentChangedFilters;
            } else
                this.currentChangedFilters = this.filters.defaultValues;

        }

        // Pick up general clicks to handle add and remove from packages.
        this.addEventListener("click", (event) => {
            this.processSearchChanges(<HTMLElement>(event.target), true);
        });


        // Call search
        this.search();

    }


    // Main search method - gather data sets.
    private search() {

        // Nullify the results on search
        this._view.model.results = null;

        let defaultValues = this.filters ? this.filters.defaultValues : {};

        let searchFilters = {...defaultValues, ...this.currentChangedFilters};

        let searchString = RequestParams.get()["domainsearch"];

        let tlds = [];
        if (RequestParams.get()["tld"]){
            tlds.push(RequestParams.get()["tld"]);
            let splitString = searchString.split(".");
            if (splitString.length > 1){
                splitString.pop();
            }
            splitString.push(RequestParams.get()["tld"]);
            searchString = splitString.join(".");
        }

        let api = new WhitelabelApi();
        api.getHintedAvailability(searchString, searchFilters, tlds).then((response) => {
            this._view.model.results = response;
            this._view.model.filterValues = searchFilters;

            let event = document.createEvent("Event");
            event.initEvent("search", false, true);
            this.dispatchEvent(event);

            // Process initial results to apply rules
            this.processInitialResults(response);
        });
    }


    // Process initial results
    private processInitialResults(results: any) {

        // Process direct results which might be premium.
        if (results.directResult &&
            (results.directResult.availability == "AVAILABLE" || results.directResult.availability == "HINTED_AVAILABLE")
            && results.directResult.pricingType == "UNKNOWN") {
            let checkbox = this.querySelector("[data-key='" + results.directResult.domainName + "']");
            this.processSearchChanges(<HTMLElement>checkbox);
        }

        if (results.featuredResults) {

            results.featuredResults.forEach(result => {
                if ((result.availability == "AVAILABLE" || result.availability == "HINTED_AVAILABLE")
                    && result.pricingType == "UNKNOWN") {
                    let checkbox = this.querySelector("[data-key='" + result.domainName + "']");
                    this.processSearchChanges(<HTMLElement>checkbox);
                }
            });

        }


    }


    // Process changes
    private processSearchChanges(target: HTMLElement, interactive: boolean = false) {

        if (!target) return;

        if (target.hasAttribute("data-check-item")) {

            let label = target.closest('label');

            ElementSpinner.spinElement(label);

            let api = new WhitelabelApi();
            api.getPremiumPriceInfo(target.dataset.key).then((priceInfo: any) => {
                ElementSpinner.restoreElement(label);
                this.updateDomainPricingType(target.dataset.key, priceInfo, interactive);

            });

        }

    }


    // Update domain result status.
    private updateDomainPricingType(domainName, priceInfo, interactive: boolean = false) {


        let allResults = this.getAllResults();

        allResults.forEach(item => {
            if (item && item.domainName == domainName) {
                item.pricingType = priceInfo.pricingType;
                item.availability = priceInfo.prices["registration"] ? item.availability : "UNAVAILABLE";


                // If standard, ensure it's added
                if (item.availability == "AVAILABLE" &&
                    (priceInfo.pricingType == "STANDARD") || priceInfo.prices.registration[0].confirmedBuyPrice) {

                    let allConfirmedPrices = [];
                    item.registrationPrices.forEach((price, index) => {
                        if (priceInfo.pricingType == "STANDARD") {
                            price.confirmed = price.standard;
                            allConfirmedPrices.push(price.standard);
                        } else {
                            price.confirmed = priceInfo.prices.registration[index] ? priceInfo.prices.registration[index].confirmedBuyPrice : "N/A";
                            if (price.confirmed != "N/A") allConfirmedPrices.push(price.confirmed);
                        }
                    });
                    item.allRegistrationPricesString = allConfirmedPrices.join(",");

                    item.renewalPrice.confirmed = priceInfo.prices.renewal[0] ? priceInfo.prices.renewal[0].confirmedBuyPrice : "N/A";

                    if (interactive) {
                        let addComponent = <HTMLElement>this.querySelector("[data-toggle-item][data-key='" + domainName + "']");
                        if (addComponent) {
                            addComponent.click();
                        }

                        let selectedItems = this._view.model.selectedItems;
                        selectedItems[domainName] = 1;
                        this._view.model.selectedItems = selectedItems;
                    }
                }


            }
        });

        let event = document.createEvent("Event");
        event.initEvent("search", false, true);
        this.dispatchEvent(event);

    }


    private getAllResults() {

        let results = this._view.model.results;

        let allResults = [];

        if (results.directResult) {
            allResults = allResults.concat(results.directResult);
            if (results.directResult.suggestions) {
                allResults = allResults.concat(results.directResult.suggestions);
            }
        }

        if (results.featuredResults) {
            results.featuredResults.forEach(result => {
                allResults = allResults.concat(result);
                if (result.suggestions) {
                    allResults = allResults.concat(result.suggestions);
                }
            });
        }

        if (results.categoryResults) {
            results.categoryResults.forEach(result => {
                allResults = allResults.concat(result);
                if (result.suggestions) {
                    allResults = allResults.concat(result.suggestions);
                }
            });
        }


        return allResults;

    }


}
