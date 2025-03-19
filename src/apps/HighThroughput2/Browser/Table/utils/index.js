

/**
 * Description placeholder
 *
 * @class DataVerifier
 * @typedef {DataVerifier}
 */
class DataVerifier {

    /**
     * Description placeholder
     *
     * @static
     * @param {{}} [obj={}]
     * @returns {boolean}
     */
    static isValidValue(value) {
      if (value === undefined) {
        return false;
      }
      if (value === null) {
        return false;
      }
      if (value === "") {
        return false;
      }
      return true;
    }
    
    /**
     * Description placeholder
     *
     * @static
     * @param {{}} [obj={}]
     * @returns {boolean}
     */
    static isValidObject(obj = {}) {
      if (!obj) {
        return false;
      }
      if (obj === null) {
        return false;
      }
      if (Object.keys(obj).length === 0) {
        return false;
      }
      return true;
    }
  
    /**
     * Description placeholder
     *
     * @static
     * @param {{}} [obj={}]
     * @returns {boolean}
     */
    static isValidObjectWith_id(obj = {}) {
      if (!obj) {
        return false;
      }
      if (obj === null) {
        return false;
      }
      if (Object.keys(obj).length === 0) {
        return false;
      }
      if(obj?._id){
        return true
      }
      return false;
    }
  
    /**
     * Description placeholder
     *
     * @static
     * @param {*} array
     * @returns {boolean}
     */
    static isValidArray(array) {
      if (!array) {
        return false;
      }
      if (array === null) {
        return false;
      }
      if (!Array.isArray(array)) {
        return false;
      }
      if (array.length <= 0) {
        return false;
      }
      return true;
    }
  
    
    /**
     * Description placeholder
     *
     * @static
     * @param {*} num
     * @returns {boolean}
     */
    static isValidNumber(num) {
      if (!num) {
        return false;
      }
      if (num === null) {
        return false;
      }
      if (isNaN(num)) {
        return false;
      }
      if (Number.isInteger) {
        if (!Number.isSafeInteger) {
          console.error("no safe Integer", num);
          return false;
        }
      }
      return true;
    }
  
    
    /**
     * Description placeholder
     *
     * @static
     * @param {*} str
     * @returns {string}
     */
    static toValidString(str) {
      if(this.isValidString(str+"")){
          return str+""
      }
      return ""
    }
  
    
    /**
     * Description placeholder
  ¿   *
     * @static
     * @param {*} str
     * @returns {boolean}
     */
    static isValidString(str) {
      if (!str) {
        return false;
      }
      if (str === null) {
        return false;
      }
      if (str === "null") {
        return false;
      }
      if (str === "") {
        return false;
      }
      return true;
    }
  }
  
  export default DataVerifier;