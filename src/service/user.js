import { mongoRepository } from '../repository/mongo/index.js';
import { utils } from '../utils/index.js';

/**
 * Creates a new user by generating a UUID and preparing the user data.
 * @async
 * @function create
 * @param {object} params - Input parameters for creating a user.
 * @param {string} params.email - User's email address.
 * @param {string} params.name - User's name.
 * @param {string} params.password - User's password.
 * @param {boolean} [params.isEnabled=false] - Indicates if the user account should be enabled. Defaults to `false`.
 * @returns {Promise<object>} The created user document from the database.
 * @example
 * const newUser = await user.create({
 *   email: 'example@example.com',
 *   name: 'Jane Doe',
 *   password: 'securepassword',
 *   isEnabled: true
 * });
 * console.log(newUser);
 * @description This function prepares the user data by generating a unique `userId` and sets default values for optional fields before passing the data to the repository for persistence.
 */
async function create(params) {
  const userData = {
    userId: utils.common.createUuid(),
    email: params.email,
    name: params.name,
    password: params.password,
    isEnabled: params.isEnabled ?? false,
  };
  return mongoRepository.users.create(userData);
}

export const user = {
  create,
};
