/**
 * Package builder - maintains states about packages being built prior to adding to cart.
 */
import WhitelabelApi from "../framework/whitelabel-api";
import ElementSpinner from "kiniauth/ts/util/element-spinner";
import RequestParams from "kiniauth/ts/util/request-params";
import AuthKinibind from "kiniauth/ts/framework/auth-kinibind";

export default class NetPackageBuilder extends HTMLElement {

    protected _view: AuthKinibind;

    /**
     * Constructor for the domain search.
     */
    constructor() {
        super();
        this.init();
    }


    // Initialise function
    protected init(kinibindOptions = {}) {


        let bindElement = this;
        if (this.getAttribute("data-bind-scope")) {
            bindElement = this.querySelector(this.getAttribute("data-bind-scope"));
        }

        let restoreKey = RequestParams.get().cartItem;

        let options: any = {

            total: "0.00",
            items: [],
            itemsByKey: {},
            prices: {},

            postPackage: (href) => {
                sessionStorage.setItem("net-package", JSON.stringify(this._view.model.items));
                window.location.href = href;
            },
            addToCart: (href, event) => {

                ElementSpinner.spinElement(<HTMLElement>event.target);

                let api = new WhitelabelApi();
                api.addItemsToCart(this._view.model.items, restoreKey).then((result) => {
                    sessionStorage.removeItem("net-package");
                    window.location.href = href + (result ? "?errors=" + JSON.stringify(result) : "");
                });
            }
        };

        // Merge options
        options = {...kinibindOptions, ...options};


        this._view = new AuthKinibind(bindElement, options);


        // Pick up general clicks to handle add and remove from packages.
        this.addEventListener("click", (event) => {
            this.processChanges(<HTMLElement>(event.target));
        });


        this.addEventListener("change", (event) => {
            this.processChanges(<HTMLElement>(event.target));
        });


        if (restoreKey) {
            this.restoreItem(restoreKey);
        } else if (sessionStorage.getItem("net-package")) {

            // We don't want persistence beyond a single transition so remove straight away.
            if (!this.hasAttribute("data-preserve-state"))
                sessionStorage.removeItem("net-package");
            else {
                this._view.model.items = JSON.parse(sessionStorage.getItem("net-package"));
                this.recalculate();
            }
        }


    }


    /**
     * @return AuthKinibind
     */
    public get view() {
        return this._view;
    }


    // Process changes from the DOM
    private processChanges(target: HTMLElement) {


        if (!target) return;

        if (target.hasAttribute("data-toggle-item")) {

            // If checkbox, support toggle functionality.
            if (target instanceof HTMLInputElement && target.type == "checkbox") {
                if (target.checked) {
                    this.addItem(target);
                } else {
                    this.removeItem(target);
                }
            }

            this.recalculate();

        } else if (target.hasAttribute("data-add-item")) {
            this.addItem(target);
            this.recalculate();
        } else if (target.hasAttribute("data-update-item")) {
            this.updateItem(target);
            this.recalculate();
        } else if (target.hasAttribute("data-remove-item")) {
            this.removeItem(target);
            this.recalculate();
        } else if (target.parentElement) {
            this.processChanges(target.parentElement);
        }

    }


    /**
     * Add an item using data attributes on a supplied element.
     *
     * @param element
     */
    private addItem(element: HTMLElement) {

        // Optimise already added ones
        let existingItem = this.getItem(element);

        if (existingItem && (existingItem.type == element.dataset.type) &&
            (existingItem.label == element.dataset.label)) {
            return;
        }


        let prices = [];
        if (element.dataset.prices) {
            let priceArray = element.dataset.prices.split(",");
            priceArray.forEach((item, index) => {
                prices[index + 1] = item;
            });
        } else {
            prices[1] = element.dataset.price;
        }

        let quantity = element.dataset.quantity ? Number(element.dataset.quantity) : 1;

        let productData = {};
        for (var key in element.dataset) {
            if (key.substr(0, 11) == "productData") {
                productData[key.substr(11, 1).toLowerCase() + key.substr(12)] = element.dataset[key];
            }
        }


        let item = {
            key: element.dataset.key,
            type: element.dataset.type,
            label: element.dataset.label,
            productData: productData,
            quantitySuffix: element.dataset.quantitySuffix,
            quantity: quantity,
            allPrices: prices,
            price: prices[quantity] ? prices[quantity] : prices[1] * quantity,
            subItems: []
        };


        // Remove before add.
        this.removeItem(element);

        let items = this._view.model.items;

        if (element.dataset.parentKey) {

            let parentItem = this.getItemByKey(element.dataset.parentKey, items);
            if (parentItem && parentItem.subItems) {
                items = parentItem.subItems;
            }
        }


        items.push(item);


    }

    /**
     * Get the item represented by the element data attributes etc.
     *
     * @param element
     */
    private getItem(element: HTMLElement) {
        let items = this._view.model.items;

        if (element.dataset.parentKey) {

            let parentItem = this.getItemByKey(element.dataset.parentKey, items);
            if (parentItem && parentItem.subItems) {
                items = parentItem.subItems;
            } else {
                return;
            }
        }


        return this.getItemByKey(element.dataset.key, items);
    }

    /**
     * Update an item (usually quantity)
     *
     * @param element
     */
    private updateItem(element: HTMLElement) {

        let item = this.getItem(element);

        if (item) {

            if (element.dataset.label) {
                item.label = element.dataset.label;
            }
            if (element.dataset.labelExtra) {
                item.labelExtra = element.dataset.labelExtra;
            }
            if (element.dataset.quantity) {
                item.quantity = element.dataset.quantity;
            }

            item.price = item.allPrices[item.quantity] ? item.allPrices[item.quantity] : (item.allPrices[1] * item.quantity).toFixed(2);
        }

    }


    /**
     * Remove an item using data attributes on a supplied element
     *
     * @param element
     */
    private removeItem(element: HTMLElement) {

        let items = this._view.model.items;

        if (element.dataset.parentKey) {
            let parentItem = this.getItemByKey(element.dataset.parentKey, items);
            if (parentItem && parentItem.subItems) {
                items = parentItem.subItems;
            } else {
                return;
            }
        }

        items.forEach((item, index) => {
            if (item && item.key == element.dataset.key) {
                items.splice(index, 1);
            }
        });

    }


    private restoreItem(restoreKey) {

        let api = new WhitelabelApi();

        api.restoreCartItem(restoreKey).then(restoreItem => {
            this._view.model.items = [restoreItem];
            this.recalculate();
        });
    }


    private getItemByKey(itemKey, array) {

        let returnedItem = null;

        array.forEach((item) => {

            if (item && item.key == itemKey) {
                returnedItem = item;
            }
        });

        return returnedItem;
    }


    // Recalculate total
    private recalculate() {
        let items = this._view.model.items;
        let total = 0;
        let itemsByKey = {};
        items.forEach(item => {

            this.updateLabels(item);

            itemsByKey[item.key] = item;

            if (item.price)
                total += Number(item.price);

            if (item.subItems) {

                let subItemsByKey = {};

                item.subItems.forEach(subItem => {

                    this.updateLabels(subItem);

                    total += Number(subItem.price);
                    subItemsByKey[subItem.key] = subItem;
                });

                item.subItemsByKey = subItemsByKey;
            }

        });


        this._view.model.itemsByKey = itemsByKey;
        this._view.model.total = total.toFixed(2);

    }


    // Update labels for an item from the page markup
    private updateLabels(item) {
        if (!item.label || !item.quantitySuffix) {

            let foundItem = null;
            this.querySelectorAll("[data-key='" + item.key + "'][data-label]").forEach((element: HTMLElement) => {

                if (!foundItem) {


                    if ((item.productData instanceof Array)) {
                        foundItem = element;
                    } else {
                        let matching = true;
                        for (var key in item.productData) {

                            if (item.productData[key] != element.dataset["productData" + key.substr(0, 1).toUpperCase() + key.substr(1)]) {
                                matching = false;
                                break;
                            }
                        }

                        if (matching) {
                            foundItem = element;
                        }
                    }

                }

            });

            if (foundItem) {
                item.label = foundItem.dataset.label;
                item.quantitySuffix = foundItem.dataset.quantitySuffix;
            }

        }
    }

}
