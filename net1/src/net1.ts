import Kinicart from "kinicart/ts/index";
import Autocomplete from "./components/autocomplete";
import "net1-base";
import EndlessScroll from "./components/endless-scroll";

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
        customElements.define("net1-endless-scroll", EndlessScroll);

    }

    // Accessible from base classes.
    protected elementVisibility(element: Element, visible: boolean) {
        element.setAttribute("data-state", visible ? "show" : "hide");
    }


}
