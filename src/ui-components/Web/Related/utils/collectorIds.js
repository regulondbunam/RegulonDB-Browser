import { DataVerifier } from "ui-components/utils";

/**
 * Recursively collects all values of the `_id` property in a given object,
 * excluding those that are in the ignore list.
 *
 * @param {Object} obj - The input object to traverse.
 * @param {Array} ignoreIds - An array of `_id` values to ignore.
 * @returns {Array} - An array of all `_id` values found in the object, excluding ignored ones.
 */
export default function collectIds(obj, ignoreIds=[]) {
    let ids = new Set();

    /**
     * Helper function to recursively traverse the object.
     *
     * @param {Object} currentObj - The current object or array being traversed.
     */
    function traverse(currentObj) {
        if (Array.isArray(currentObj)) {
            // If the current object is an array, iterate through each element
            currentObj.forEach(item => traverse(item));
        } else if (typeof currentObj === 'object' && currentObj !== null) {
            // If the current object is an object, iterate through each key
            for (const key in currentObj) {
                if (currentObj.hasOwnProperty(key)) {
                    if (key === '_id') {
                        // If the key is '_id' and it's not in the ignore list, add its value to the ids array
                        if (!ignoreIds.includes(currentObj[key]) && DataVerifier.isValidString(currentObj[key])) {
                            ids.add(currentObj[key])
                        }
                    } else {
                        // Otherwise, recursively traverse the value of the key
                        traverse(currentObj[key]);
                    }
                }
            }
        }
    }

    // Start the traversal with the input object
    traverse(obj);

    return [...ids];
}