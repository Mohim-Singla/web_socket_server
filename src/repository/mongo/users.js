import { modelMap } from '../../db/mongo/models/index.js';

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
};
