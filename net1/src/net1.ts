import "net1-base";
import Kinicart from "../../../kinicart/kinicart-js/ts/index";
import Autocomplete from "./components/autocomplete";

export default class Net1 {

  constructor(settings: any) {
    this.net1Init(settings);
  }

  private net1Init(settings: any) {

    // Enable Netistrar White Label
    new Kinicart({
      endpoint: settings.backendUrl,
      recaptchaKey: settings.recaptchaKey,
      elementVisibilityFunction: this.elementVisibility
    });

    // Create any custom elements we require
    customElements.define("net1-autocomplete", Autocomplete);

  }

  // Accessible from base classes.
  protected elementVisibility(element: Element, visible: boolean) {
    element.setAttribute("data-state", visible ? "show" : "hide");
  }


}