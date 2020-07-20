/**
 * Domain search component.  Manages the data sets used for drawing
 * search results.
 */


export default class NetMultiSelectFilter extends HTMLElement {


    // Current value
    private currentValue = null;

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise function
    private init() {

        let selectAll: HTMLInputElement = this.querySelector("[data-select-all]");
        let items = this.querySelector("[data-items]");


        selectAll.addEventListener("click", () => {
            items.querySelectorAll("input[type='checkbox']").forEach((item: HTMLInputElement) => {
                if (selectAll.checked) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        });

        this.addEventListener("click", (event) => {

            setTimeout(() => {
                this.updateSelectAllStatus();
            }, 20);


        });


        this.addEventListener("sourceLoaded", (event) => {
            if (this.currentValue) {
                this.value = this.currentValue;
            }

            let dispatchEvent = document.createEvent("Event");
            dispatchEvent.initEvent("filterLoaded", false, true);
            this.dispatchEvent(dispatchEvent);

        })


    }


    // Update the select all status
    private updateSelectAllStatus() {

        let selectAll: HTMLInputElement = this.querySelector("[data-select-all]");
        let items = this.querySelector("[data-items]");

        let checked = items.querySelectorAll("input[type='checkbox']:checked");
        if (checked.length == items.children.length) {
            selectAll.checked = true;
        } else {
            selectAll.checked = false;
        }

    }


    /**
     * Get the value for this component.
     */
    public get value() {

        let value;

        let all = this.querySelector("[data-select-all]");
        let items = this.querySelector("[data-items]");

        if ((<HTMLInputElement>all).checked) {
            value = "ALL";
        } else {
            value = [];
            items.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
                if ((<HTMLInputElement>checkbox).checked) {
                    value.push(checkbox.getAttribute("data-value"));
                }
            });

        }

        return value;
    }


    /**
     * Set the value for this component.
     *
     * @param value
     */
    public set value(value) {

        this.currentValue = value;

        let items = this.querySelector("[data-items]");

        items.querySelectorAll("input[type='checkbox']").forEach((checkbox: HTMLInputElement) => {

            if (value == "ALL" || value.includes(checkbox.getAttribute("data-value"))) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });

        this.updateSelectAllStatus();
    }


}
