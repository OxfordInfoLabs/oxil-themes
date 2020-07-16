import tippy from 'tippy.js/dist/tippy.esm';
import Kiniauth from "kiniauth/ts";
import KaBind from "kiniauth/ts/components/ka-bind";
import KaPasswordReset from "kiniauth/ts/components/ka-password-reset";
import KaNewPassword from "kiniauth/ts/components/ka-new-password";
import KaRegister from "kiniauth/ts/components/ka-register";
import KaActivate from "kiniauth/ts/components/ka-activate";
import KaSignout from "kiniauth/ts/components/ka-signout";
import KaSignin from "kiniauth/ts/components/ka-signin";
import KcCart from "kinicart/ts/components/kc-cart";
import KaRecaptcha from "kiniauth/ts/components/ka-recaptcha";
import Ka2fa from "kiniauth/ts/components/ka-2fa";
import NetRadioSet from "./components/filters/net-radio-set";
import NetRangeFilter from "./components/filters/net-range-filter";
import NetMultiSelectFilter from "./components/filters/net-multi-select-filter";
import NetDomainTransfer from "./components/net-domain-transfer";
import NetSlider from "./components/net-slider";
import NetDomainSearch from "./components/net-domain-search";
import NetPackageBuilder from "./components/net-package-builder";
import NetDomainFilters from "./components/net-domain-filters";
import NetQuantityFilter from "./components/filters/net-quantity-filter";
import NetProductPrice from "./components/net-product-price";
import NetMoreLoader from "./components/net-more-loader";
import KaDynamicForm from "kiniauth/ts/components/ka-dynamic-form";
import "oxil-net1/src/net1-base";

export default class NetCommerce extends Kiniauth {

    constructor(settings: any) {

        super({
            endpoint: settings.whitelabelBackendUrl,
            recaptchaKey: settings.recaptchaKey,
            componentPrefix: "net",
            elementVisibilityFunction: function (element: Element, visible: boolean) {
                element.setAttribute("data-state", visible ? "show" : "hide");
            }
        });

        this.init();
    }


    public bindElements() {

        // Core elements from Kiniauth
        customElements.define('net-bind', KaBind);
        customElements.define('net-recaptcha', KaRecaptcha);
        customElements.define('net-signin', KaSignin);
        customElements.define('net-signout', KaSignout);
        customElements.define('net-2fa', Ka2fa);
        customElements.define('net-password-reset', KaPasswordReset);
        customElements.define('net-new-password', KaNewPassword);
        customElements.define('net-register', KaRegister);
        customElements.define('net-activate', KaActivate);
        customElements.define('net-dynamic-form', KaDynamicForm);

        // Core elements from Kinicart
        customElements.define('net-cart', KcCart);

        // Custom elements for Netistrar Whitelabel
        customElements.define('net-slider', NetSlider);

        customElements.define('net-range-filter', NetRangeFilter);
        customElements.define('net-radio-set', NetRadioSet);
        customElements.define('net-multi-select-filter', NetMultiSelectFilter);
        customElements.define('net-quantity-filter', NetQuantityFilter);

        customElements.define('net-domain-filters', NetDomainFilters);
        customElements.define('net-domain-search', NetDomainSearch);
        customElements.define('net-domain-transfer', NetDomainTransfer);
        customElements.define('net-package-builder', NetPackageBuilder);
        customElements.define('net-product-price', NetProductPrice);
        customElements.define('net-more-loader', NetMoreLoader);


    }


    // Custom init for themey stuff
    private init() {


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
