/**
 * Quantity filter - expects the usual markup of + and - buttons
 */
export default class NetQuantityFilter extends HTMLElement {

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise function
    private init() {

        this.addEventListener("click", (event) => {
            let target = <HTMLElement>event.target;

            if (target.tagName.toLowerCase() != "button"){
                target = target.parentElement;
            }

            if (target.hasAttribute("data-plus")){
                let max = this.getAttribute("data-max") ? this.getAttribute("data-max") : 50;

                let value = this.value;
                if (value < max) {
                    value++;
                    this.value = value;
                    this.fireInputChange();
                }

            } else if (target.hasAttribute("data-minus")){
                let min = this.getAttribute("data-min") ? this.getAttribute("data-min") : 1;

                let value = this.value;
                if (value > min) {
                    value--;
                    this.value = value;
                    this.fireInputChange();
                }
            }

        });



    }


    /**
     * Return the value for this range object.
     */
    public get value() {
        return Number((<HTMLInputElement>this.querySelector("[data-value]")).value);
    }


    /**
     * Set the value for this range object.
     *
     * @param value
     */
    public set value(value) {
        let element = (<HTMLInputElement>this.querySelector("[data-value]"));
        element.value = String(value);
        element.setAttribute("value", String(value));

    }


    // Fire input change
    private fireInputChange() {

        let element = this.querySelector("[data-value]");

        element.dispatchEvent(new Event("input"));


    }


}
