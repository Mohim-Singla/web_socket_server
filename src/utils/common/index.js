import _ from 'lodash';

export const common = {
  /**
     * Function to stringify JSON objects
     * @param {JSON} data JSON input
     * @returns {string} stringified JSON input
     */
  stringifyJSON: (data) => {
    return JSON.stringify(data);
  },
  /**
     * Checks if the data is null or undefined.
     * @param {any} data - The data to check.
     * @returns {boolean} - Returns true if data is null or undefined.
     */
  isNullorUndefined: (data) => {
    return _.isNull(data) || _.isUndefined(data);
  },
  /**
     * Checks if the data is a boolean value.
     * @param {any} data - The data to check.
     * @returns {boolean} - Returns true if data is a boolean, otherwise false.
     */
  isBoolean: (data) => {
    return _.isBoolean(data);
  },
  /**
     * Parses a value to determine its boolean representation.
     * @param {any} data - The data to parse.
     * @param {boolean} [defaultVal=false] - The default value to return if data is null or undefined.
     * @returns {boolean} - Returns true if data is boolean true, the string 'true' (case-insensitive), otherwise false.
     */
  parseBoolean: (data, defaultVal = false) => {
    if (common.isNullorUndefined(data)) {
      return defaultVal;
    }

    if(common.isBoolean(data)) {
      return data;
    }

    return data.toLowerCase() === 'true';
  }
};
