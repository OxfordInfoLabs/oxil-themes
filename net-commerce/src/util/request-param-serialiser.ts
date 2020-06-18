import PropertySerialiser from "./property-serialiser";

/**
 * Get / set a request parameter using the current url
 */
export default class RequestParamSerialiser extends HTMLElement {


    /**
     * Set an object as the value of a request param - serialises to a string
     *
     * @param paramName
     * @param paramObjectValue
     */
    public static set(paramName: string, paramObjectValue: any) {

        let url = window.location.href;
        let paramPos = url.indexOf("&" + paramName + "=");
        if (paramPos > 0) {
            url = url.substr(0, paramPos);
        }

        if (paramObjectValue) {
            let serialisedValue = PropertySerialiser.serialise(paramObjectValue);
            url = url + "&" + paramName + "=" + serialisedValue;
        }

        history.pushState({}, '', url);

    }


    /**
     * Unset a request param
     *
     * @param paramName
     */
    public static unset(paramName: string) {
        RequestParamSerialiser.set(paramName, null);
    }


    /**
     * Get the value of a request param as an object unserialised.  Returns null if
     * no param is found.
     *
     * @param paramName
     */
    public static get(paramName: string) {

        let url = window.location.href;
        let explodedUrl = url.split("&" + paramName + "=");
        if (explodedUrl.length == 2) {
            return PropertySerialiser.unserialise(explodedUrl[1]);
        } else {
            return null;
        }


    }

}
