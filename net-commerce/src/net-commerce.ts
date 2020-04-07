import "oxil-net1/src/net1-base";
import * as queryString from 'query-string/index';
import NetistrarWhiteLabel from "netistrar-whitelabel/ts/index";

export default class NetCommerce {

    constructor(settings: any) {
        this.init(settings);
    }

    private init(settings: any) {

        // Enable Netistrar White Label
        new NetistrarWhiteLabel({
            endpoint: settings.whitelabelBackendUrl,
            recaptchaKey: settings.recaptchaKey,
            elementVisibilityFunction: function (element: Element, visible: boolean) {
                element.setAttribute("data-state", visible ? "show" : "hide");
            }
        });

        NetistrarWhiteLabel.kinibind.bind(document.getElementById("body"),
            {
                tldFilterValue: "",
                request: queryString.parse(location.search)
            });

    }


}
