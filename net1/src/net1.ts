import "net1-base";
import Kinicart from "../../../kinicart/kinicart-js/ts/index";

export default class Net1 {

    constructor(settings: any) {
        this.init(settings);
    }

    private init(settings: any) {

        // Enable Netistrar White Label
        new Kinicart({
            endpoint: settings.backendUrl,
            recaptchaKey: settings.recaptchaKey,
            elementVisibilityFunction: function (element: Element, visible: boolean) {
                element.setAttribute("data-state", visible ? "show" : "hide");
            }
        });

    }

}