import { modelMap } from '../models/index.js';

/**
 * Fetches all groups from the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to retrieve groups based on the provided options,
 * such as filtering, projection, pagination, and sorting.
 * @async
 * @function fetchAll
 * @memberof module:groups
 * @param {Object} options - Sequelize query options (e.g., `where`, `attributes`, `limit`, `offset`, `order`).
 * @returns {Promise<Array>} A promise that resolves to an array of groups matching the query options.
 * @throws {Error} If there is an issue fetching the groups from the database.
 */
async function fetchAll(options) {
  return modelMap.groupsModel.getModel().findAll(options);
}

/**
 * Fetches a single group record based on the provided options.
 * @async
 * @function
 * @param {Object} options - The query options for fetching the record.
 * @returns {Promise<Object|null>} The group record or null if not found.
 */
async function fetchOne(options) {
  return modelMap.groupsModel.getModel().findOne(options);
}

/**
 * Creates a new group in the MySQL database using Sequelize.
 * This function interacts with the Sequelize model to insert a new group record into the database.
 * @async
 * @function create
 * @memberof module:groups
 * @param {Object} groupData - The data for the new group (e.g., `{ title, type, description, createdBy, members }`).
  * @param {object} [transaction] - An optional transaction object for managing the operation within a transaction.
 * @returns {Promise<Object>} A promise that resolves to the created group record.
 * @throws {Error} If there is an issue creating the group in the database.
 */
async function create(groupData, transaction) {
  return modelMap.groupsModel.getModel().create(groupData, { transaction });
}

/**
 * Module containing database operations for groups.
 * @module groups
 */
export const groups = {
  create,
  fetchAll,
  fetchOne,
};
