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
                data[this.getAttribute("data-source-key")] = results;

                new AuthKinibind(this,
                    data);


                let event = document.createEvent("Event");
                event.initEvent("sourceLoaded", false, true);
                this.dispatchEvent(event);


            });
        }


        this.addEventListener("sourceLoaded", (event) => {
            if (this.currentValue) {
                this.value = this.currentValue;
            }

            let dispatchEvent = document.createEvent("Event");
            dispatchEvent.initEvent("filterLoaded", false, true);
            this.dispatchEvent(dispatchEvent);

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
