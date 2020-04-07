import Configuration from "kiniauth/ts/configuration";

/**
 * Reusable autocomplete components
 */
export default class Autocomplete extends HTMLElement {

  // Constructor
  constructor() {
    super();
    this.init();
  }

  // Initialiser
  private init() {

    let input = this.querySelector("input");
    let resultsDiv = <HTMLElement>this.querySelector("[data-results]");

    let keyCounter = 0;

    // Listen for input on the text field
    input.addEventListener("input", (event) => {

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
        input.blur();
      }

    });


    // Process focus
    input.addEventListener("focus", () => {
      this.processInput();
    });

    // Process blur
    input.addEventListener("blur", () => {
      this.setResultVisibility(false);
    });


    // Stop propagation on clicks within this component
    this.addEventListener("click", (event) => {
      event.stopPropagation();
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
      this.dispatchEvent(new Event("resultsShow"));
    } else {
      this.dispatchEvent(new Event("resultsHide"));
    }

  }


}
