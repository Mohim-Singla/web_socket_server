import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serviceConfig } from '../../config/index.js';

export const common = {
  /**
   * Converts a JSON object to a string.
   * @function stringifyJSON
   * @param {Object} data - The JSON object to stringify.
   * @returns {string} The stringified JSON.
   * @example
   * const jsonData = { key: 'value' };
   * const result = common.stringifyJSON(jsonData);
   * console.log(result); // '{"key":"value"}'
   */
  stringifyJSON: (data) => {
    return JSON.stringify(data);
  },

  /**
   * Checks if the given data is `null` or `undefined`.
   * @function isNullorUndefined
   * @param {*} data - The data to check.
   * @returns {boolean} `true` if the data is `null` or `undefined`, otherwise `false`.
   * @example
   * console.log(common.isNullorUndefined(null)); // true
   * console.log(common.isNullorUndefined(undefined)); // true
   * console.log(common.isNullorUndefined('value')); // false
   */
  isNullorUndefined: (data) => {
    return _.isNull(data) || _.isUndefined(data);
  },

  /**
   * Checks if the given data is a boolean value.
   * @function isBoolean
   * @param {*} data - The data to check.
   * @returns {boolean} `true` if the data is a boolean, otherwise `false`.
   * @example
   * console.log(common.isBoolean(true)); // true
   * console.log(common.isBoolean('true')); // false
   */
  isBoolean: (data) => {
    return _.isBoolean(data);
  },

  /**
   * Parses a value to its boolean representation.
   * @function parseBoolean
   * @param {*} data - The data to parse.
   * @param {boolean} [defaultVal=false] - The default value to return if the data is `null` or `undefined`.
   * @returns {boolean} `true` if the value is boolean `true` or the string `'true'` (case-insensitive), otherwise `false`.
   * @example
   * console.log(common.parseBoolean('true')); // true
   * console.log(common.parseBoolean('false')); // false
   * console.log(common.parseBoolean(undefined, true)); // true
   */
  parseBoolean: (data, defaultVal = false) => {
    if (common.isNullorUndefined(data)) {
      return defaultVal;
    }

    if (common.isBoolean(data)) {
      return data;
    }

    return data.toLowerCase() === 'true';
  },

  /**
   * Generates a unique UUID (Universally Unique Identifier).
   * @function createUuid
   * @returns {string} A new UUID.
   * @example
   * const uuid = common.createUuid();
   * console.log(uuid); // Example: '123e4567-e89b-12d3-a456-426614174000'
   */
  createUuid: () => {
    return uuidv4();
  },
  /**
   * Hashes a plain text password using bcrypt.
   * @param {string} password - The plain text password to hash.
   * @returns {Promise<string|null>} - A promise that resolves to the hashed password or `null` if no password is provided.
   * @example
   * const hashedPassword = await createPasswordHash('myPassword123');
   * console.log(hashedPassword); // Logs the hashed password
   */
  createPasswordHash: (password) => {
    if (!password) return password;
    return bcrypt.hash(password, serviceConfig.PASSWORD_SALT_ROUNDS);
  },

  /**
   * Validates a plain text password against a hashed password.
   * @param {string} plainTextPassword - The plain text password provided by the user.
   * @param {string} passwordHash - The hashed password stored in the database.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, or `false` otherwise.
   * @example
   * const isValid = await validatePassword('myPassword123', hashedPassword);
   * if (isValid) {
   *   console.log('Password is correct');
   * } else {
   *   console.log('Invalid password');
   * }
   */
  validatePassword: async (plainTextPassword, passwordHash) => {
    return bcrypt.compare(plainTextPassword, passwordHash);
  },

  /**
   * Asynchronously generates a signed JSON Web Token (JWT).
   * @async
   * @function signToken
   * @param {Object} data - The payload to include in the token.
   * @returns {Promise<string>} A promise that resolves to the signed JWT.
   */
  signToken: async (data) => {
    return jwt.sign(data, serviceConfig.JWT_SECRET_KEY, { expiresIn: '1h' });
  },

  /**
   * Asynchronously verifies a JSON Web Token (JWT).
   * @async
   * @function verifyToken
   * @param {string} token - The JWT to verify.
   * @returns {Promise<Object>} A promise that resolves to the decoded token payload if verification is successful.
   * @throws {Error} If the token is invalid or expired.
   */
  verifyToken: async (token) => {
    return jwt.verify(token, serviceConfig.JWT_SECRET_KEY);
  },
};
