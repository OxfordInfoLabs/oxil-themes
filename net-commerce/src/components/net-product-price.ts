/**
 * Inline product price wrapper - exposes a single property of price which can be used
 * inside the container.
 */
import WhitelabelApi from "../framework/whitelabel-api";
import NetPackageBuilder from "./net-package-builder";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";

export default class NetProductPrice extends HTMLElement {

    // Live promises
    private static prices: any = {};


    constructor() {
        super();
        this.init();
    }


    // Initialise
    private init() {

        let key = this.getAttribute("data-key");

        let productType = this.getAttribute("data-product-type");
        let recurrence = this.getAttribute("data-recurrence");


        let dataKeys = Object.keys(this.dataset);
        let dataAttributes = {};
        let priceKey = "";
        dataKeys.forEach((key) => {
            if (key.substr(0, 6) == "filter") {
                dataAttributes[key.substr(6, 1).toLowerCase() + key.substr(7)] = this.dataset[key];
            }
            priceKey += this.dataset[key];
        });


        if (!NetProductPrice.prices[priceKey]) {
            NetProductPrice.prices[priceKey] = new Promise((done) => {
                let api = new WhitelabelApi();
                api.getProductPrice(productType, recurrence, dataAttributes).then((result) => {
                    done(result);
                });
            });
        }

        NetProductPrice.prices[priceKey].then((result) => {
            let kinibindView = (<NetPackageBuilder>this.closest("net-package-builder")).view;
            let prices = kinibindView.model.prices;
            prices[key] = result;
            kinibindView.model.prices = {...prices};
        });


    }


}
