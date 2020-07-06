import Configuration from "kiniauth/ts/configuration";

/**
 * Reusable autocomplete components
 */
export default class Autocomplete extends HTMLElement {

    // Update loop variable
    private _updateLoop = false;

    // Constructor
    constructor() {
        super();
        this.init();
    }


    get value() {
        return this.getAttribute('value');
    }

    set value(newValue) {
        this.setAttribute('value', newValue);
    }

    // Initialiser
    private init() {

        let input = this.querySelector("input");
        let resultsDiv = <HTMLElement>this.querySelector("[data-results]");

        let keyCounter = 0;

        // Listen for input on the text field
        input.addEventListener("input", (event) => {

            if (this._updateLoop) {
                this._updateLoop = false;
                return;
            }

            let me = <HTMLInputElement>event.target;

            // Increment global key counter
            keyCounter++;

            let myCounter = keyCounter;

            setTimeout(() => {

                if (myCounter == keyCounter) {
                    this.processInput();
                }
            }, 500);

        });

        // Process special keys
        input.addEventListener("keydown", (event) => {

            if (event.key == "Escape") {
                this.setResultVisibility(false);
            } else if (event.key == "Enter") {
                event.preventDefault();

                let resultsDiv = <HTMLElement>this.querySelector("[data-results]");
                let activeDiv = resultsDiv.querySelector(".active");
                if (activeDiv) {
                    this.processResultSelection(activeDiv);
                }

                this.setResultVisibility(false);
            } else if (event.key == "ArrowUp") {
                this.moveSelection(-1);
            } else if (event.key == "ArrowDown") {
                this.moveSelection(1);
            }

        });


        // Process focus
        input.addEventListener("focus", () => {
            this.processInput();
        });

        // Process blur
        input.addEventListener("blur", () => {
            //this.setResultVisibility(false);
        });


        // Stop propagation on clicks within this component
        this.addEventListener("click", (event) => {

            event.stopPropagation();

            let element = <HTMLElement>event.target;
            while (!element.hasAttribute("data-result-value") && element.parentElement) {
                element = element.parentElement;
            }

            if (element.hasAttribute("data-result-value")) {
                this.processResultSelection(element);

                // Hide the results
                this.setResultVisibility(false);
            }


        });

        // Ensure we close the results on body clicks outside of our component
        document.body.addEventListener("click", () => {
            this.setResultVisibility(false);
        });


    }


    // Process input
    private processInput() {

        let input = this.querySelector("input");
        let minChars = this.getAttribute("data-min-chars") ? this.getAttribute("data-min-chars") : 2;

        // Show / hide according to length of value.
        this.setResultVisibility(input.value.length >= minChars);

    }


    // Set result visibility
    private setResultVisibility(visible: boolean) {
        let resultsDiv = <HTMLElement>this.querySelector("[data-results]");
        Configuration.elementVisibilityFunction(resultsDiv, visible);

        if (visible) {
            let event = document.createEvent("Event");
            event.initEvent("resultsShow", false, true);
            this.dispatchEvent(event);
        } else {
            let event = document.createEvent("Event");
            event.initEvent("resultsHide", false, true);
            this.dispatchEvent(event);
        }

    }


    // Move selection in autocomplete by selected offset (1 or -1)
    private moveSelection(offset) {

        let resultsDiv = <HTMLElement>this.querySelector("[data-results]");

        let activeDiv = resultsDiv.querySelector(".active");
        if (activeDiv) {
            activeDiv.classList.remove("active");

            if (offset == -1 && activeDiv.previousElementSibling) {
                activeDiv = activeDiv.previousElementSibling;
            } else if (offset == 1 && activeDiv.nextElementSibling) {
                activeDiv = activeDiv.nextElementSibling;
            }

        } else {
            activeDiv = (<HTMLElement>resultsDiv.firstElementChild);
        }

        if (activeDiv) {
            activeDiv.classList.add("active");
        }


    }


    // Process result selection
    private processResultSelection(selectedElement) {

        let input = this.querySelector("input");


        // Dispatch an autocomplete event
        this.value = selectedElement.getAttribute("data-result-value");
        let event = document.createEvent("Event");
        event.initEvent("input", false, true);
        this.dispatchEvent(event);

        // // Dispatch an input event
        input.value = selectedElement.getAttribute("data-result-label");
        this._updateLoop = true;
        event = document.createEvent("Event");
        event.initEvent("input", false, true);
        input.dispatchEvent(event);


        // Dispatch the change event
        event = document.createEvent("Event");
        event.initEvent("change", false, true);
        this.dispatchEvent(event);


    }


}
