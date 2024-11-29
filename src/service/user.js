import { mysqlRepository } from '../db/mysql/repository/index.js';
import { utils } from '../utils/index.js';

/**
 * Fetches a single user record from the MySQL database by email.
 * @async
 * @function fetchOneWithEmail
 * @param {string} userEmail - The email address of the user to fetch.
 * @returns {Promise<object|null>} The matched user record, or `null` if no user is found.
 * @example
 * const user = await user.fetchOneWithEmail('example@example.com');
 * console.log(user);
 * @description This function retrieves a user record from the database by searching for the specified email address.
 */
async function fetchOneWithEmail(userEmail) {
  const condition = {
    where: { email: userEmail },
  };
  return mysqlRepository.users.fetchOne(condition);
}

/**
 * Creates a new user by generating a UUID and preparing the user data.
 * @async
 * @function create
 * @param {object} params - Input parameters for creating a user.
 * @param {string} params.email - User's email address.
 * @param {string} params.name - User's name.
 * @param {string} params.password - User's password.
 * @param {boolean} [params.isEnabled=false] - Indicates if the user account should be enabled. Defaults to `false`.
 * @param {object} [transaction] - An optional transaction object for managing the operation within a transaction.
 * @returns {Promise<object>} The created user record from the database.
 * @example
 * const newUser = await user.create({
 *   email: 'example@example.com',
 *   name: 'Jane Doe',
 *   password: 'securepassword',
 *   isEnabled: true
 * });
 * console.log(newUser);
 * @description This function prepares the user data by generating a unique `userId` and hashing the password.
 * It sets default values for optional fields before saving the user in the database.
 */
async function create(params, transaction = null) {
  const passwordHash = await utils.common.createPasswordHash(params.password);
  const userData = {
    userId: utils.common.createUuid(),
    email: params.email,
    name: params.name,
    password: passwordHash,
    isEnabled: params.isEnabled ?? false,
  };
  return mysqlRepository.users.create(userData, transaction);
}

/**
 * Validates a plain text password against a hashed password.
 * @async
 * @function validatePassword
 * @param {string} plainTextPassword - The plain text password provided by the user.
 * @param {string} passwordHash - The hashed password stored in the database.
 * @returns {Promise<boolean>} Resolves to `true` if the passwords match, or `false` otherwise.
 * @example
 * const isValid = await user.validatePassword('myPassword123', hashedPassword);
 * if (isValid) {
 *   console.log('Password is correct');
 * } else {
 *   console.log('Invalid password');
 * }
 * @description This function uses the utility module to compare the plain text password with the hashed password.
 */
async function validatePassword(plainTextPassword, passwordHash) {
  const isPasswordValid = await utils.common.validatePassword(plainTextPassword, passwordHash);
  return isPasswordValid;
}

export const user = {
  create,
  fetchOneWithEmail,
  validatePassword,
};
