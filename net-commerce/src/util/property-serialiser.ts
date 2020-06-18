/**
 * Property serialiser / unserialiser class for serialising
 * properties into a format suitable for encoding in URLs.
 */
export default class PropertySerialiser extends HTMLElement {


    /**
     * Serialise a property object
     *
     * @param propertyObject
     */
    public static serialise(propertyObject) {

        let keys = Object.keys(propertyObject);

        // Loop through keys
        let strings = [];
        keys.forEach((key) => {
            let property = propertyObject[key];
            if (property instanceof Array) {
                strings.push(key + "!" + "~" + property.join("~"));
            } else {
                strings.push(key + "!" + property);
            }

        });

        return strings.join("*");


    }


    /**
     * Unserialise a string into a property object
     *
     * @param serialisedProperties
     */
    public static unserialise(serialisedProperties: string) {

        let exploded = serialisedProperties.split("*");
        let propertyObject = {};
        exploded.forEach((property) => {
            let explodedProperty = property.split("!");

            let propertyName = explodedProperty[0];
            let propertyValue = explodedProperty[1];

            let propertyValues = propertyValue.split("~");

            if (propertyValues.length == 1) {
                propertyObject[propertyName] = propertyValue;
            } else {
                propertyObject[propertyName] = propertyValues.slice(1);
            }

        });

        return propertyObject;

    }


}
