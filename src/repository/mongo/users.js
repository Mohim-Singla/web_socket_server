import { modelMap } from '../../db/mongo/models/index.js';

/**
 * Fetches a single user document from the database.
 * @async
 * @function fetchOne
 * @param {object} filter - MongoDB filter object to find the user.
 * @param {object|null} [projection] - Fields to include or exclude in the result.
 * @param {object|null} [options] - Additional query options.
 * @returns {Promise<object|null>} The matched user document or `null` if no user is found.
 * @example
 * const user = await users.fetchOne({ email: 'example@example.com' }, { name: 1 }, { lean: true });
 * console.log(user);
 * @description This function queries the database for a single user document based on the provided filter.
 */
async function fetchOne(filter, projection, options) {
  return modelMap.usersModel.getModel().findOne(filter, projection, options);
}

/**
 * Creates a new user record in the database.
 * @async
 * @function create
 * @param {object} userData - Data for the new user.
 * @param {string} userData.email - User's email address.
 * @param {string} userData.name - User's name.
 * @param {string} userData.password - User's password.
 * @param {boolean} userData.isEnabled - Indicates if the user account is enabled.
 * @returns {Promise<object>} The created user document.
 * @example
 * const newUser = await users.create({
 *   email: 'example@example.com',
 *   name: 'John Doe',
 *   password: 'securepassword',
 *   isEnabled: true
 * });
 * console.log(newUser);
 * @description This function interacts with the database to create a new user using the `usersModel`.
 */
async function create(userData) {
  return modelMap.usersModel.getModel().create(userData);
}

export const users = {
  create,
  fetchOne,
};
