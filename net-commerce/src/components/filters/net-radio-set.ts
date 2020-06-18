/**
 * Radio set component - manages a single value for a radio set.
 */
import WhitelabelApi from "../../framework/whitelabel-api";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";


export default class NetRadioSet extends HTMLElement {

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


        if (this.getAttribute("data-source")) {
            let api = new WhitelabelApi();
            api.callAPI(this.getAttribute("data-source")).then((results) => {

                let data = {};
                data[this.getAttribute("data-model")] = results;

                new AuthKinibind(this,
                    data);

                this.dispatchEvent(new Event("sourceLoaded"));


            });
        }


        this.addEventListener("sourceLoaded", (event) => {
            if (this.currentValue) {
                this.value = this.currentValue;
            }

            let filterLoadedEvent = new Event("filterLoaded");
            this.dispatchEvent(filterLoadedEvent);

        });


        this.addEventListener("click", (event) => {
            this.value = (<HTMLInputElement>this.querySelector("[type='radio']:checked")).value;
        });


        this.currentValue = this.getAttribute("data-value");


    }


    /**
     * Get the value for this component.
     */
    public get value() {
        return this.currentValue;
    }


    /**
     * Set the value for this component.
     *
     * @param value
     */
    public set value(value) {

        this.currentValue = value;

        let radio = (<HTMLInputElement>this.querySelector("[value='" + value + "']"));

        if (radio)
            radio.checked = true;
    }


}
