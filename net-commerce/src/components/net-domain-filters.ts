/**
 * Domain filters component.  Manages domain filters including setting default values
 * and maintaining state including raising events when things change.
 */
import RequestParams from "kiniauth/ts/util/request-params";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";


export default class NetDomainFilters extends HTMLElement {


    // Default values
    private _defaultValues;

    // Current values
    private _currentValues;

    // Kinibind view
    private view: AuthKinibind;

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise function
    private init() {


        this.querySelectorAll("[data-reset-filters]").forEach(resetFilters => {

            resetFilters.addEventListener("click", () => {
                this.updateValues(this.defaultValues);
                if (resetFilters.hasAttribute("data-apply")) {
                    this.applyCurrentFilters();
                }
            });
        });


        this.querySelectorAll("[data-reset-filter]").forEach(resetFilter => {
            resetFilter.addEventListener("click", () => {
                let filter = resetFilter.getAttribute("data-filter");
                if (filter) {
                    let newValues = {};
                    newValues[filter] = this.defaultValues[filter];
                    this.updateValues(newValues);
                    this.applyCurrentFilters();
                }
            });
        });


        // Apply filters, gets the current values and throws event
        this.querySelectorAll("[data-apply-filters]").forEach(applyFilters => {
            applyFilters.addEventListener("click", () => {
                this.applyCurrentFilters();
            });
        });


        this._defaultValues = this.values;

        this.view = new AuthKinibind(this,
            {
                request: RequestParams.get(),
                changedFilters: {},
                changedFilterCount: 0,
                filterValues: {}
            });


    }


    private applyCurrentFilters() {
        this.updateCurrentData(this.values);

        let event = document.createEvent("Event");
        event.initEvent("filterChange", false, true);
        this.dispatchEvent(event);
    }

    // Update kinibind data on changes
    private updateCurrentData(currentValues) {

        this._currentValues = currentValues;

        let changes = this.changes;
        this.view.model.changedFilters = changes;
        this.view.model.changedFilterCount = Object.keys(changes).length;
        this.view.model.filterValues = currentValues;
    }

    private updateValues(filterValues) {

        let keys = Object.keys(filterValues);

        keys.forEach((key) => {

            let fields = this.querySelectorAll("[data-filter='" + key + "']");

            fields.forEach(field => {

                if (field.tagName.toLowerCase() == "input") {
                    switch (field.getAttribute("type")) {
                        case "checkbox":
                            (<HTMLInputElement>field).checked = (filterValues[key] === 1 || filterValues[key] === "1");
                            let event = document.createEvent("Event");
                            event.initEvent("change", false, true);
                            field.dispatchEvent(event);

                            break;
                    }
                } else {
                    (<HTMLInputElement>field).value = filterValues[key];
                }

            });


        });
    }


    // Get filter values
    public get values() {

        let filterValues = {};

        this.querySelectorAll("[data-filter]").forEach((item) => {

            let filter = item.getAttribute("data-filter");

            // Handle each case individually
            if (item.tagName.toLowerCase() == "input") {
                switch (item.getAttribute("type")) {
                    case "checkbox":
                        filterValues[filter] = (<HTMLInputElement>item).checked ? 1 : 0;
                        break;
                }
            } else {
                filterValues[filter] = (<HTMLInputElement>item).value;
            }


        });


        return filterValues;

    }


    // Set filter values
    public set values(filterValues) {
        this.updateValues(filterValues);

        let completeValues = {...this.defaultValues, ...filterValues};
        this.updateCurrentData(completeValues);
    }


    /**
     * Get the changes from the default values for the current values.
     */
    public get changes() {

        let defaultValues = this.defaultValues;
        let values = this._currentValues;

        let valueKeys = Object.keys(values);
        let changes = {};
        valueKeys.forEach((item: string) => {
            if (defaultValues[item] != values[item])
                changes[item] = values[item];
        });

        return changes;
    }


    /**
     * Get the default values as defined in mark up.
     */
    public get defaultValues() {
        return this._defaultValues;
    }


}
