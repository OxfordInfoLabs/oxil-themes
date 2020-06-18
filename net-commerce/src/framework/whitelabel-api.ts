import Configuration from "kiniauth/ts/configuration";

/**
 * API methods for accessing backend via fetch
 */
export default class WhitelabelApi {


    /**
     * Get hinted availability
     *
     * @param searchTerm
     * @param filters
     */
    public getHintedAvailability(searchTerm, filters) {

        let params = {...filters};
        params["keyword"] = searchTerm;

        return this.callAPI("/guest/domain/hinted", params, "POST");
    }


    /**
     * Get live availability
     *
     * @param domainName
     */
    public getLiveAvailability(domainName) {
        return this.callAPI("/guest/domain/live/" + domainName);
    }


    /**
     * Get product price using product type, recurrence and additional data if required.
     *
     * @param productType
     * @param recurrence
     * @param otherData
     */
    public getProductPrice(productType, recurrence, otherData) {

        if (!recurrence) recurrence = 1;

        let params = {"productType": productType, "recurrence": recurrence};
        for (var key in otherData) {
            params["data-" + key] = otherData[key];
        }

        return this.callAPI("/guest/product/price", params);

    }


    /**
     * Add items to cart
     *
     * @param items
     */
    public addItemsToCart(items, restoreKey) {
        return this.callAPI("/guest/cart/add?updateIndex=" + restoreKey, items, "POST");
    }


    /**
     * Restore a cart item by key
     *
     * @param itemKey
     */
    public restoreCartItem(itemKey) {
        return this.callAPI("/guest/cart/restore/" + itemKey);
    }


    /**
     * Check transfer availability
     *
     * @param domainName
     */
    public checkTransferAvailability(domainName) {
        return this.callAPI("/guest/domain/transfer/availability/" + domainName);
    }


    /**
     * Check the lock status
     *
     * @param domainName
     */
    public checkLockStatus(domainName) {
        return this.callAPI("/guest/domain/transfer/lockstatus/" + domainName);
    }


    /**
     * Check the lock status
     *
     * @param domainName
     */
    public checkAssignedStatus(domainName) {
        return this.callAPI("/guest/domain/transfer/assignedstatus/" + domainName);
    }


    /**
     * Check the auth code.
     *
     * @param domainName
     * @param authCode
     */
    public checkAuthCode(domainName, authCode) {
        return this.callAPI("/guest/domain/transfer/authcode/" + domainName, authCode, 'POST');
    }


    /**
     * Call an API using fetch
     *
     * @param url
     * @param params
     * @param method
     */
    public callAPI(url: string, params: any = {}, method: string = 'GET') {

        url = Configuration.endpoint + url;

        var obj: any = {
            method: method,
            credentials: 'include'
        };

        if (method != 'GET') {
            obj.body = JSON.stringify(params);
        } else if (params) {
            let paramArray = [];
            for (var key in params) {
                paramArray.push(key + "=" + params[key]);
            }
            if (paramArray.length)
                url += "?" + paramArray.join("&");
        }

        return new Promise(done => {
            fetch(url, obj).then(response => {
                response.json().then(result => {
                    done(result);
                }).catch(() => {
                    done(null);
                });
            });
        });

    }

}
