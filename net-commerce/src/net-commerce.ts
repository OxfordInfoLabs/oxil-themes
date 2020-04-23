import "oxil-net1/src/net1-base";
import * as queryString from 'query-string/index';
import tippy from 'tippy.js/dist/tippy.esm';
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


        let netDomainSearch = document.querySelector('net-domain-search');
        if (netDomainSearch)
            netDomainSearch.addEventListener('search', function () {

                tippy('net-domain-search .pop', {
                    content(reference) {
                        const template = reference.nextElementSibling;
                        return template.innerHTML;
                    },
                    trigger: 'click'
                });
            });

    }


}
