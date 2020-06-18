/**
 * Domain search component.  Manages the data sets used for drawing
 * search results.
 */
export default class NetRangeFilter extends HTMLElement {

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise function
    private init() {

        let range = this.querySelector("input[type='range']");

        range.addEventListener("change", () => {
            this.updateRangeValues();
        });


        this.updateRangeValues();

    }


    // Update all range values
    private updateRangeValues() {

        let rangeValues = this.querySelectorAll("[data-range-value]");

        rangeValues.forEach((item) => {
            item.innerHTML = this.value;
        });

    }


    /**
     * Return the value for this range object.
     */
    public get value() {
        return (<HTMLInputElement>this.querySelector("input[type='range']")).value;
    }


    /**
     * Set the value for this range object.
     *
     * @param value
     */
    public set value(value) {
        (<HTMLInputElement>this.querySelector("input[type='range']")).value = value;
        this.updateRangeValues();
    }


}
