/**
 * Domain transfer component.
 */
import RequestParams from "kiniauth/ts/util/request-params";
import WhitelabelApi from "../framework/whitelabel-api";
import ElementSpinner from "kiniauth/ts/util/element-spinner";
import KaRecaptcha from "kiniauth/ts/components/ka-recaptcha";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";


export default class NetDomainTransfer extends HTMLElement {

    // Kinibind view for state management
    private view: AuthKinibind;

    // Transfer domain
    private transferDomain: string;

    // Cart item.
    private cartItem: any;


    // Constructor
    constructor() {
        super();
        this.init();
    }


    // Initialiser
    private init() {

        this.view = new AuthKinibind(this,
            {
                result: true,
                status: null,
                total: 0.00,
                items: [],
                transferDomain: null,
                authCode: "",
                authError: "",
                checkLockStatus: (event) => {
                    event.preventDefault();
                    this.checkLockStatus();
                },
                checkAssignedStatus: (event) => {
                    event.preventDefault();
                    this.checkAssignedStatus();
                },
                checkAuthCode: (event) => {
                    event.preventDefault();
                    this.checkAuthCode();
                },
                addToCart: (href, event) => {

                    let item = event.target;

                    ElementSpinner.spinElement(<HTMLElement>item);

                    let api = new WhitelabelApi();
                    api.addItemsToCart(this.view.model.items, "").then(() => {
                        window.location.href = href;
                    });

                }
            });

        let transferDomain = RequestParams.get().transferDomain;

        // If transfer domain, continue
        if (transferDomain) {
            this.transferDomain = transferDomain;
            this.view.model.transferDomain = transferDomain;
            this.checkTransferAvailability();
        }

    }


    private checkAssignedStatus() {

        let api = new WhitelabelApi();

        // Spin the element
        let form = <HTMLElement>this.querySelector("[data-check-assigned]");
        let button = <HTMLElement>form.querySelector("[type='submit']");
        let captcha = <KaRecaptcha>form.querySelector("net-recaptcha");


        if (!captcha || !captcha.isRendered() || captcha.getResponse()) {

            ElementSpinner.spinElement(button);

            api.checkAssignedStatus(this.transferDomain).then(result => {
                ElementSpinner.restoreElement(button);
                this.view.model.status = result;

                if (result == "unassigned" && captcha) {
                    captcha.render();
                }

            });
        }

    }


    // Check lock status
    private checkLockStatus() {

        let api = new WhitelabelApi();

        // Spin the element
        let form = <HTMLElement>this.querySelector("[data-check-lock-status]");
        let button = <HTMLElement>form.querySelector("[type='submit']");
        let captcha = <KaRecaptcha>form.querySelector("net-recaptcha");


        if (!captcha || !captcha.isRendered() || captcha.getResponse()) {

            ElementSpinner.spinElement(button);

            api.checkLockStatus(this.transferDomain).then(result => {
                ElementSpinner.restoreElement(button);
                this.view.model.status = result;

                if (result == "locked" && captcha) {
                    captcha.render();
                }

            });
        }
    }


    // Check auth code
    private checkAuthCode() {

        let api = new WhitelabelApi();

        // Spin the element
        let form = <HTMLElement>this.querySelector("[data-check-auth-code]");
        let button = <HTMLElement>form.querySelector("[type='submit']");
        let captcha = <KaRecaptcha>form.querySelector("net-recaptcha");

        if (!captcha || !captcha.isRendered() || captcha.getResponse()) {

            ElementSpinner.spinElement(button);
            this.view.model.authError = "";

            api.checkAuthCode(this.transferDomain, this.view.model.authCode).then((result: any) => {
                ElementSpinner.restoreElement(button);


                if (result.success) {
                    this.view.model.status = "authorised";
                    this.cartItem.productData = {authCode: this.view.model.authCode};

                    let items = this.view.model.items;
                    items.push(this.cartItem);
                    if (items.length > 1)
                        items.shift();

                    this.view.model.total = this.cartItem.price;


                } else {

                    this.view.model.authError = result.errorMessage;

                    if (captcha) {
                        captcha.render();
                    }
                }


            });
        }

    }


    // Check availability and first status
    private checkTransferAvailability() {

        let api = new WhitelabelApi();

        // Set result to false to show checking status
        this.view.model.result = false;

        api.checkTransferAvailability(this.transferDomain).then(result => {
            this.view.model.result = true;
            this.view.model.status = result[0];

            if (result[0] == "unavailable") {
                window.location.href = this.getAttribute("data-search-url") + "?domainsearch=" + this.transferDomain;
            }


            if (!isNaN(result[1])) {
                this.cartItem = {
                    "type": "domainname",
                    "key": this.transferDomain,
                    "label": this.transferDomain + " transfer",
                    "price": result[1],
                    "quantity": 1
                };

                if (result[0] == "assigned") {
                    let items = this.view.model.items;
                    items.push(this.cartItem);
                    if (items.length > 1)
                        items.shift();
                    this.view.model.total = this.cartItem.price;

                }

            }

        });


    }


}
