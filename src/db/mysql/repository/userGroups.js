import { modelMap } from '../models/index.js';

/**
 * Performs a bulk insert of user-group data into the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to insert multiple records in a single operation.
 * @async
 * @function bulkCreate
 * @memberof module:userGroups
 * @param {Array<Object>} usersGroupData - An array of objects containing user-group data
 * @param {object} [transaction] - An optional transaction object for managing the operation within a transaction.
 * (e.g., `[ { userId: 1, groupId: 2 }, { userId: 3, groupId: 4 } ]`).
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of the created records.
 * @throws {Error} If there is an issue performing the bulk insert in the database.
 */
async function bulkCreate(usersGroupData, transaction) {
  return modelMap.userGroupsModel.getModel().bulkCreate(usersGroupData, { transaction });
}

/**
 * Fetches all userGroups from the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to retrieve userGroups based on the provided options,
 * such as filtering, projection, pagination, and sorting.
 * @async
 * @function fetchAll
 * @memberof module:userGroups
 * @param {Object} options - Sequelize query options (e.g., `where`, `attributes`, `limit`, `offset`, `order`).
 * @returns {Promise<Array>} A promise that resolves to an array of userGroups association matching the query options.
 * @throws {Error} If there is an issue fetching the userGroups from the database.
 */
async function fetchAll(options) {
  return modelMap.userGroupsModel.getModel().findAll(options);
}

/**
 * Fetches a single userGroup from the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to retrieve a single userGroup based on the provided options,
 * such as filtering, projection, pagination, and sorting.
 * @async
 * @function fetchOne
 * @memberof module:userGroups
 * @param {Object} options - Sequelize query options (e.g., `where`, `attributes`, `limit`, `offset`, `order`).
 * @returns {Promise<Object|null>} A promise that resolves to a single userGroup object or null if not found.
 * @throws {Error} If there is an issue fetching the userGroup from the database.
 */
async function fetchOne(options) {
  return modelMap.userGroupsModel.getModel().findOne(options);
}

/**
 * Updates records in the user_groups table based on the provided data and options.
 *
 * @async
 * @function update
 * @param {Object} data - The data to be updated.
 * @param {Object} options - The Sequelize options for the update operation (e.g., `where` clause).
 * @returns {Promise<[number, number]>} A promise that resolves to an array, where the first element
 * represents the number of affected rows and the second element is always `undefined` (as per Sequelize's update method).
 * @throws Will throw an error if the update operation fails.
 */
async function update(data, options) {
  return modelMap.userGroupsModel.getModel().update(data, options);
}

/**
 * Module containing database operations for user-group relations.
 * @module userGroups
 */
export const userGroups = {
  bulkCreate,
  fetchAll,
  fetchOne,
  update,
};
