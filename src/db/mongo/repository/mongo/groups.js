import { modelMap } from '../../models/index.js';

/**
 * Fetches all groups from the MongoDB database based on the provided filter, projection, and options.
 * This function interacts with the MongoDB model to retrieve groups matching the specified
 * filter conditions, and applies optional projections and query options (e.g., pagination, sorting).
 * @async
 * @function fetchAll
 * @memberof module:groups
 * @param {Object} filter - The filter conditions to match groups (e.g., `{ type: 'PUBLIC' }`).
 * @param {Object} [projection] - The fields to include or exclude in the result (e.g., `{ name: 1 }`).
 * @param {Object} [options] - Additional query options, such as pagination or sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of groups matching the filter.
 * @throws {Error} If there is an issue fetching the groups from the database.
 */
async function fetchAll(filter, projection, options) {
  return modelMap.groupsModel.getModel().find(filter, projection, options);
}

/**
 * Creates a new group in the MongoDB database.
 * This function interacts with the MongoDB model to insert a new group document into the database.
 * @async
 * @function create
 * @memberof module:groups
 * @param {Object} groupData - The data for the new group (e.g., `{ title, type, description, createdBy, members }`).
 * @returns {Promise<Object>} A promise that resolves to the created group document.
 * @throws {Error} If there is an issue creating the group in the database.
 */
async function create(groupData) {
  return modelMap.groupsModel.getModel().create(groupData);
}

/**
 * Module containing database operations for groups.
 * @module groups
 */
export const groups = {
  create,
  fetchAll,
};
